from django.contrib import admin

from .models import SiteInfo,FriendLink,FriendCategory,NavigationBar
# Register your models here.

@admin.register(FriendLink)
class FriendLinkAdmin(admin.ModelAdmin):
    list_display = ['name','category','description','url']


@admin.register(NavigationBar)
class NavigationBarAdmin(admin.ModelAdmin):
    list_display = ['name','parents','index']


@admin.register(SiteInfo)
class SiteInfoAdmin(admin.ModelAdmin):
    list_display = ['site_name','site_description','keywords','icp']


@admin.register(FriendCategory)
class FriendCategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

