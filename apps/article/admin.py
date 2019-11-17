from django.contrib import admin
from .models import Article, Category, Tag

# Register your models here.

# 自定义管理站点的名称和URL标题
admin.site.site_header = '网站管理'
admin.site.site_title = '博客后台管理'


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'created_time', 'status', 'comment_status', 'type', 'views', 'category']
    list_display_links = ['title', ]
    list_filter = ['status', 'type', 'category', 'tags']
    filter_horizontal = ['tags', ]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent_category', 'slug']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
