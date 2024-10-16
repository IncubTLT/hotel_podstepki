import datetime
import json
import os

from django.contrib import messages
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
from django.shortcuts import redirect, render
from django.urls import reverse
from django.utils.safestring import mark_safe
from dotenv import load_dotenv
from formtools.wizard.views import SessionWizardView

from booking.forms import BookingCustomerForm, BookingDateForm, BookingTimeForm
from booking.models import Booking, BookingSettings
from booking.settings import (BOOKING_BG, BOOKING_DESC, BOOKING_DISABLE_URL,
                              BOOKING_SUCCESS_REDIRECT_URL, BOOKING_TITLE)
from bot.villa_bot import bot, chat_ids, logger
from index.models import Room

from .get_available_times_view import get_available_time

load_dotenv()

# Отображение этапов заполнения формы в процессе бронирования.
BOOKING_STEP_FORMS = (
    ('Date', BookingDateForm),
    ('Time', BookingTimeForm),
    ('User Info', BookingCustomerForm)
)
STEP_NAMES_TRANSLATION = {
    'Date': 'Дата',
    'Time': 'Время',
    'User Info': 'Данные пользователя',
}


class BookingCreateWizardView(SessionWizardView):
    """
    Окно мастера для создания новых бронирований,
    управления многоэтапной отправкой форм.
    """

    template_name = "booking/user/booking_wizard.html"
    form_list = BOOKING_STEP_FORMS

    def dispatch(self, request, *args, **kwargs):
        """
        Перехватывает запрос и сохраняет room_id в сессии для последующего использования.
        """
        # Получаем room_id из URL и сохраняем его в сессии
        room_id = kwargs.get('room_id')
        if room_id:
            request.session['room_id'] = room_id

        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, form, **kwargs):
        """
        Расширяет контекст шаблона, добавляя дополнительные данные,
        связанные с бронированием.

        Аргументы:
            форма: текущий экземпляр формы, который обрабатывается.

        Возвращается:
            Словарь, содержащий контекстные данные для шаблона.
        """
        # Инициализируем контекстные данные из базового класса
        context = super().get_context_data(form=form, **kwargs)

        # Определение ширины прогресса в зависимости от текущего шага
        progress_widths = {
            'Date': '6',
            'Time': '30',
            'User Info': '75'
        }
        current_step = self.steps.current

        # Получаем ID комнаты из сессии и саму комнату
        room_id = self.request.session.get('room_id')
        room = Room.objects.get(id=room_id)

        # Получаем все существующие бронирования для этой комнаты
        bookings = Booking.objects.filter(room=room).values('date', 'date_check_out')

        # Преобразуем занятые даты в список
        booked_dates = []
        for booking in bookings:
            current_date = booking['date']
            while current_date <= booking['date_check_out']:
                booked_dates.append(current_date.strftime('%Y-%m-%d'))
                current_date += datetime.timedelta(days=1)

        # Передаем занятые даты в контекст в виде JSON для использования в шаблоне
        context['booked_dates'] = mark_safe(json.dumps(booked_dates, cls=DjangoJSONEncoder))

        # Обновляем контекст динамическими значениями на основе текущего шага
        context.update({
            'progress_width': progress_widths.get(current_step, '0'),
            'booking_settings': self.get_booking_settings(),
            'booking_bg': BOOKING_BG,
            'description': BOOKING_DESC,
            'title': BOOKING_TITLE,
            'step_name': STEP_NAMES_TRANSLATION.get(
                current_step, current_step
            ),
        })

        # Добавляем доступное время в контекст на шаге "Время"
        if current_step == 'Time':
            cleaned_data = self.get_cleaned_data_for_step('Date')
            date_check_in = cleaned_data.get('date_check_in')
            date_check_out = cleaned_data.get('date_check_out')
            context['get_available_time'] = get_available_time(
                date_check_in, date_check_out
            )

        return context

    def get_booking_settings(self):
        """
        Кэширует и возвращает первый экземпляр BookingSettings,
        чтобы свести к минимуму запросы к базе данных.
        """
        if not hasattr(self, '_booking_settings'):
            self._booking_settings = BookingSettings.objects.first()
        return self._booking_settings

    def render(self, form=None, **kwargs):
        """
        Пользовательский метод визуализации для обработки ответа
        на основе настроек бронирования.

        Аргументы:
            форма: Экземпляр формы для визуализации, если он не указан,
            использует текущую форму.

        Возвращается:
            Объект HttpResponse либо отображает форму, либо перенаправляет,
            если бронирование отключено.
        """
        form = form or self.get_form()
        context = self.get_context_data(form=form, **kwargs)

        # Перенаправление, если бронирование отключено в настройках
        if not context['booking_settings'].booking_enable:
            return redirect(BOOKING_DISABLE_URL)

        return self.render_to_response(context)

    def done(self, form_list, **kwargs):
        """
        Обрабатывает формы после завершения всех шагов.

        Аргументы:
            form_list: Список экземпляров форм для каждого шага.

        Возвращает:
            Переадресацию на URL-адрес успешного завершения брони.
        """
        # Объединяем данные формы в экземпляр бронирования
        room_id = self.request.session.get('room_id')
        room = Room.objects.get(id=room_id)

        # Объединяем данные всех форм в один словарь
        data = {}
        for form in form_list:
            data.update(form.cleaned_data)

        # Принудительно добавляем комнату в данные бронирования
        data['room'] = room
        date_check_in = data.get('date')
        date_check_out = data.get('date_check_out')

        # Проверяем, есть ли уже существующее бронирование
        # для данной комнаты и даты
        conflicting_bookings = Booking.objects.filter(
            room=room
        ).filter(
            Q(date__lte=date_check_out, date_check_out__gte=date_check_in)
        )

        # Если есть пересечения по датам, показываем сообщение об ошибке
        if conflicting_bookings.exists():
            messages.error(
                self.request,
                "Комната уже забронирована на выбранные даты."
            )
            return redirect(
                reverse(
                    'booking:create_booking',
                    kwargs={'room_id': room.id}
                ) + '?step=0'
            )

        # Создаем объект Booking на основе собранных данных
        booking = Booking.objects.create(**data)
        name = data["user_name"]
        email = data["user_email"]
        phone = data["user_mobile"]
        message = f"Имя: {name}\nТелефон: {phone}\nПочта: {email}\nНомер бронирования: {booking.id}"

        for chat_id in chat_ids:
            print(f"Sending message to chat_id: {chat_id}")
            try:
                bot.send_message(chat_id=chat_id, text=message)
            except Exception as error:
                logger.error(f"Ошибка при отправке сообщения в Telegram для {chat_id}: {error}")
        # Перенаправить на URL-адрес успешного завершения, если он указан,
        # в противном случае отобразить шаблон завершения
        if BOOKING_SUCCESS_REDIRECT_URL:
            return redirect(BOOKING_SUCCESS_REDIRECT_URL)

        return render(
            self.request, 'booking/user/booking_done.html', {
                "progress_width": "100",
                "booking_id": booking.id,
                "booking_bg": BOOKING_BG,
                "description": BOOKING_DESC,
                "title": BOOKING_TITLE,
            }
        )
