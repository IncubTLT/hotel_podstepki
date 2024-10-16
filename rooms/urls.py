from django.urls import path
from . import views


app_name = 'rooms'


urlpatterns = [
    path('<int:pk>/', views.room_detail, name='room_detail'),
    path("luxe/", views.luxe, name="luxe"),
    path("elite/", views.elite, name="elite"),
    path("premium/", views.premium, name="premium"),
    path("batherouse/", views.batherouse, name="batherouse"),
    path("house/", views.house, name="house"),
    path("pavilion/", views.pavilion, name="pavilion"),
]
