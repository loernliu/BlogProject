from django.template import Library

from ..models import FeatureInfo,OtherInfo,SocialInfo

register = Library()

@register.simple_tag
def get_feature():
    return FeatureInfo.objects.all()[:3]

@register.simple_tag
def get_other_info():
    return OtherInfo.objects.first()

@register.simple_tag
def social_info():
    return SocialInfo.objects.all()