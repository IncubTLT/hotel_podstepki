from django.conf import settings

PAGINATION = getattr(settings, 'DJ_BOOKING_PAGINATION', 10)

BOOKING_SUCCESS_REDIRECT_URL = getattr(settings, 'BOOKING_SUCCESS_REDIRECT_URL', None)

BOOKING_DISABLE_URL = getattr(settings, 'BOOKING_DISABLE_URL', "/")

BOOKING_BG = getattr(settings, 'BOOKING_BG', "images/booking_bg.jpg")

BOOKING_TITLE = getattr(settings, 'BOOKING_TITLE', "Бронирование Villa 23")

BOOKING_DESC = getattr(settings, 'BOOKING_DESC', "Бронируйте просто и быстро!")
