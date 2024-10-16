from django import forms

from booking.models import BookingSettings


class ChangeInputsStyle(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # add common css classes to all widgets
        for field in iter(self.fields):
            # get current classes from Meta
            input_type = self.fields[field].widget.input_type
            classes = self.fields[field].widget.attrs.get("class")
            if classes is not None:
                classes += " form-check-input" if input_type == "checkbox" else " form-control  flatpickr-input"
            else:
                classes = " form-check-input" if input_type == "checkbox" else " form-control flatpickr-input"
            self.fields[field].widget.attrs.update({
                'class': classes
            })


class BookingDateForm(ChangeInputsStyle):
    date = forms.DateField(
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'id_Date-check_in'}),
        label='Дата заезда'
    )
    date_check_out = forms.DateField(
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'id_Date-check_out'}),
        label='Дата выезда'
    )


class BookingTimeForm(ChangeInputsStyle):
    time = forms.TimeField(widget=forms.HiddenInput(), label='Время')


class BookingCustomerForm(ChangeInputsStyle):
    user_name = forms.CharField(max_length=250, label='Имя')
    user_email = forms.EmailField(label='e-mail')
    user_mobile = forms.CharField(max_length=15, label='Телефон')


class BookingSettingsForm(ChangeInputsStyle, forms.ModelForm):
    start_time = forms.TimeField(widget=forms.TimeInput(format='%H:%M'))
    end_time = forms.TimeField(widget=forms.TimeInput(format='%H:%M'))

    def clean_max_booking_per_time(self):
        if self.cleaned_data["max_booking_per_time"] < 1:
            raise forms.ValidationError(
                    "Должно быть хотя бы 1 бронирование!")
        return self.cleaned_data["max_booking_per_time"]

    def clean_end_time(self):
        if "end_time" in self.cleaned_data and "start_time" in self.cleaned_data:
            if self.cleaned_data["end_time"] <= self.cleaned_data["start_time"]:
                raise forms.ValidationError(
                    [{"end_time": "Время выезда должно быть позже времени заезда."}]
                )
        # if self.cleaned_data["max_booking_per_time"] < 1:
        #     raise forms.ValidationError(
        #             "max booking per time must be 1 or more")

        return self.cleaned_data["end_time"]

    class Meta:
        model = BookingSettings
        fields = "__all__"
        exclude = [
            # TODO: Add this fields to admin panel and fix the functions
            # "max_booking_per_time",
            "max_booking_per_day",
        ]
