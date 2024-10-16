from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

# from hotel_podstepki.storages import VKCloudMediaStorage


class Room(models.Model):
    title = models.CharField(_('название комнаты'), max_length=255)
    description = models.TextField(_('описание комнаты'))
    price = models.PositiveIntegerField(_('стоимость за сутки'))
    image = models.ImageField(
        _('фото комнаты'),
        upload_to='rooms/',
        # storage=VKCloudMediaStorage,
    )
    hourly = models.BooleanField(_('почасовая аренда'), default=False)

    def get_absolute_url(self):
        return reverse('rooms:room_detail', kwargs={'pk': self.pk})

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'номер'
        verbose_name_plural = 'номера'
