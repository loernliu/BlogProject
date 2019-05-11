from django.template import Library

from ..models import FeatureInfo,OtherInfo

register = Library()

@register.simple_tag
def get_feature():
    return FeatureInfo.objects.all()[:3]

@register.simple_tag
def get_other():
    a = OtherInfo.objects.first()
    print("---------------")
    print(a)
    return a
