from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from index.models import Room


class RoomDetail(models.Model):
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='details'
    )
    detail = models.TextField(_('детали комнаты'))
    size = models.CharField(
        _('площадь комнаты например 50 м2'),
        max_length=50,
        blank=True
    )
    balcony = models.BooleanField(_('балкон'), default=False)
    air_conditioning = models.BooleanField(_('кондиционер'), default=False)
    microwave = models.BooleanField(_('микроволновая печь'), default=False)
    minikitchen = models.BooleanField(_('кухня'), default=False)
    refrigerator = models.BooleanField(_('холодильник'), default=False)
    tv = models.BooleanField(_('телевизор'), default=False)
    kettle = models.BooleanField(_('чайник'), default=False)
    bathrooms = models.IntegerField(_('душевая'), default=1)
    wifi = models.BooleanField(_('wi-fi'), default=False)

    def __str__(self):
        return self.detail

    def get_absolute_url(self):
        return reverse('room_detail', args=[str(self.id)])

    class Meta:
        verbose_name = 'детали номера'
        verbose_name_plural = 'детали номера'


class RoomImage(models.Model):
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(_('фото комнаты'), upload_to='room_images/')
    caption = models.CharField(_('название фото'), max_length=255, blank=True)

    class Meta:
        verbose_name = 'фото номера'
        verbose_name_plural = 'фото номера'


class HotelService(models.Model):
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='hotel_services'
    )
    name = models.CharField(_('название услуги'), max_length=255)
    description = models.TextField(_('описание услуги'))
    price = models.IntegerField(_('стоимость услуги'), blank=True, null=True)

    class Meta:
        verbose_name = 'дополнительная услуга'
        verbose_name_plural = 'дополнительные услуги'


class RoomFeature(models.Model):
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='features'
    )
    name = models.CharField(
        _('наименование особенности'),
        max_length=255,
        blank=True,
        null=True
    )
    description = models.CharField(
        _('наименование особенности'),
        max_length=255,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'особенность номера'
        verbose_name_plural = 'особенности номера'


class Rule(models.Model):
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='rules'
    )
    rule_text = models.TextField(_('описание правил'))
    rule_number = models.IntegerField(_('порядковый номер правила'))

    class Meta:
        verbose_name = 'правило отеля'
        verbose_name_plural = 'правила отеля'
