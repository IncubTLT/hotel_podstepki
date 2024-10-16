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
    return render(request, 'event.html')


def territory(request):
    return render(request, 'territory.html')
