from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator


class User(AbstractUser):
    username = models.CharField(
        _('имя пользователя'),
        max_length=256,
        unique=True,
    )
    telegram = models.CharField(
        _('телеграм аккаунт'),
        max_length=256,
        blank=True,
        unique=True,
    )
    email = models.EmailField(
        _('электронная почта'),
    )
    first_name = models.CharField(
        _('имя'),
        max_length=64,
    )
    last_name = models.CharField(
        _('фамилия'),
        max_length=64,
    )
    is_staff = models.BooleanField(
        _('статус персонала'),
        default=False,
    )
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Номер телефона должен быть в формате: '+71234567890'."
    )
    phone_number = models.CharField(
        validators=[phone_regex],
        max_length=16,
        blank=True
    )

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'

    @property
    def fullname(self) -> str:
        return f'{self.first_name} {self.last_name}'
