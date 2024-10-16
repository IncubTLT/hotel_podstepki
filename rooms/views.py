from django.shortcuts import render, get_object_or_404
from index.models import Room


def room_detail(request, pk):
    room = get_object_or_404(Room, pk=pk)
    details = room.details.all()
    images = room.images.all()
    hotel_services = room.hotel_services.all()
    rules = room.rules.all().order_by('rule_number')
    room_features = room.features.all()

    context = {
        'room': room,
        'details': details,
        'images': images,
        'hotel_services': hotel_services,
        'rules': rules,
        'room_features': room_features,
    }
    return render(request, 'rooms/room_detail.html', context)


def luxe(request):
    return render(request, 'rooms/luxe.html')


def elite(request):
    return render(request, 'rooms/elite.html')


def premium(request):
    return render(request, 'rooms/premium.html')


def batherouse(request):
    return render(request, 'rooms/batherouse.html')


def house(request):
    return render(request, 'rooms/house.html')


def pavilion(request):
    return render(request, 'rooms/pavilion.html')
