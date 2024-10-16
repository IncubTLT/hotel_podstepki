from booking.models import Booking
from index.models import Room

def is_fully_booked(date):
    # Подсчитать количество забронированных номеров на указанную дату
    booked_rooms = Booking.objects.filter(date=date).count()

    # Получить общее количество номеров
    total_rooms = Room.objects.count()

    # Проверить, все ли номера заняты
    return booked_rooms >= total_rooms
