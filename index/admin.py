from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Room
from rooms.models import RoomDetail, RoomImage, HotelService, RoomFeature, Rule


class RoomDetailInline(admin.StackedInline):
    model = RoomDetail
    extra = 1


class RoomImageInline(admin.StackedInline):
    model = RoomImage
    extra = 3


class HotelServiceInline(admin.StackedInline):
    model = HotelService
    extra = 1


class RoomFeatureInline(admin.StackedInline):
    model = RoomFeature
    extra = 1


class RuleInline(admin.StackedInline):
    model = Rule
    extra = 1


@admin.register(Room)
class RoomsAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'price', 'image', 'hourly')
    search_fields = ('name',)
    empty_value_display = '-пусто-'
    inlines = [
        RoomDetailInline,
        RoomImageInline,
        HotelServiceInline,
        RoomFeatureInline,
        RuleInline
    ]

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(
                f'<img src="{obj.image.url}" style="max-height: 100px;">'
            )
        return ''
    image_preview.short_description = 'Превью картинки'

    readonly_fields = ('image_preview',)
    fields = (
        'title',
        'description',
        'price',
        'image',
        'hourly',
        'image_preview'
    )
