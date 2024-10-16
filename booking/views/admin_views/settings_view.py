
from django.shortcuts import reverse
from django.views.generic import UpdateView

from booking.forms import BookingSettingsForm
from booking.models import BookingSettings
from booking.utils import BookingSettingMixin


class BookingSettingsView(BookingSettingMixin, UpdateView):
    form_class = BookingSettingsForm
    template_name = "booking/admin/booking_settings.html"

    def get_object(self):
        return BookingSettings.objects.filter().first()

    def get_success_url(self):
        return reverse("booking_settings")
