from django.db import models
from users.models import User
from index.models import Room

BOOKING_PERIOD = (
    ("5", "5M"),
    ("10", "10M"),
    ("15", "15M"),
    ("20", "20M"),
    ("25", "25M"),
    ("30", "30M"),
    ("35", "35M"),
    ("40", "40M"),
    ("45", "45M"),
    ("60", "1H"),
    ("75", "1H 15M"),
    ("90", "1H 30M"),
    ("105", "1H 45M"),
    ("120", "2H"),
    ("150", "2H 30M"),
    ("180", "3H"),
)


class Booking(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date = models.DateField(null=True)
    date_check_out = models.DateField(null=True)
    time = models.TimeField(blank=True, null=True)
    user_name = models.CharField(max_length=250)
    user_email = models.EmailField()
    approved = models.BooleanField(default=False)
    user_mobile = models.CharField(blank=True, null=True, max_length=10)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "бронирование"
        verbose_name_plural = "бронирования"

    def __str__(self) -> str:
        return self.user_name or "(No Name)"


class BookingSettings(models.Model):
    # General
    booking_enable = models.BooleanField(default=True)
    confirmation_required = models.BooleanField(default=True)
    # Date
    disable_weekend = models.BooleanField(default=True)
    available_booking_months = models.IntegerField(
        default=1,
        help_text="если 2, пользователь может забронировать номер только на следующие два месяца."
    )
    max_booking_per_day = models.IntegerField(null=True, blank=True)
    # Time
    start_time = models.TimeField()
    end_time = models.TimeField()
    period_of_each_booking = models.CharField(
        max_length=3,
        default="60",
        choices=BOOKING_PERIOD,
        help_text="сколько времени занимает бронирование."
    )
    max_booking_per_time = models.IntegerField(
        default=1,
        help_text="сколько номеров можно забронировать за каждый раз."
    )

    class Meta:
        verbose_name = "настройка бронирования"
        verbose_name_plural = "настройки бронирования"
