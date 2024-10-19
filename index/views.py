from pathlib import Path

from django.conf import settings
from django.shortcuts import render
from django.utils import timezone

from .models import Room


def get_rooms():
    rooms = Room.objects.all()
    today = timezone.now().date()
    return rooms, today


def index(request):
    rooms, today = get_rooms()
    context = {
        'rooms': rooms,
        'today': today
    }
    return render(request, 'index.html', context)


def hotel(request):
    rooms, today = get_rooms()
    context = {
        'rooms': rooms,
        'today': today
    }
    return render(request, 'hotel.html', context)


def pool(request):
    return render(request, 'pool.html')


def batherouse(request):
    return render(request, 'batherouse.html')


def event(request):
    if settings.DEBUG:
        base_static_path = settings.STATICFILES_DIRS[0]
    else:
        base_static_path = settings.STATIC_ROOT

    # Путь к папке с изображениями
    images_path = Path(base_static_path) / 'images'

    # Проверяем, существует ли директория с изображениями
    if images_path.exists() and images_path.is_dir():
        # Получаем список файлов в директории и фильтруем по наличию "pavilion" в имени
        pavilion_photos = [f.name for f in images_path.iterdir() if 'pavilion' in f.name.lower() and f.suffix == '.jpeg']
    else:
        pavilion_photos = []

    return render(request, 'event.html', {'pavilion_photos': pavilion_photos})


def territory(request):
    return render(request, 'territory.html')
