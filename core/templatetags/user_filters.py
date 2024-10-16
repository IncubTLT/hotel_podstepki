# in templatetags/user_filters.py
from django import template

register = template.Library()


@register.filter(name='addattributes')
def addattributes(field, attributes):
    """
    Add multiple attributes to a form field widget.

    Example usage: {{ field|addattributes:"class=form-control id=username" }}
    """
    attrs = {}
    for attribute in attributes.split():
        key, value = attribute.split('=')
        attrs[key] = value
    return field.as_widget(attrs=attrs)


@register.filter
def addclass(field, css):
    return field.as_widget(attrs={'class': css})
