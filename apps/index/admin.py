from django.contrib import admin

# Register your models here.
from .models import SocialInfo,FeatureInfo,OtherInfo

@admin.register(SocialInfo)
class SocialInfoAdmin(admin.ModelAdmin):
    list_display = ['name','url','index']


@admin.register(OtherInfo)
class OtherInfoAdmin(admin.ModelAdmin):
    list_display = ['hitokoto','notice']


@admin.register(FeatureInfo)
class FeatureInfoAdmin(admin.ModelAdmin):
    list_display = ['feature_title']
