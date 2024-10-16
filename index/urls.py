from django.urls import path
from . import views

app_name = "index"

urlpatterns = [
    path("", views.index, name="index"),
    path("hotel/", views.hotel, name="hotel"),
    path("pool/", views.pool, name="pool"),
    path("batherouse/", views.batherouse, name="batherouse"),
    path("event/", views.event, name="event"),
    path("territory/", views.territory, name="territory"),
]
