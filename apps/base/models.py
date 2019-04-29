from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

# Create your models here.

class SiteInfo(models.Model):
    site_name = models.CharField(max_length=20, verbose_name='网站名称')
    site_description = models.CharField(max_length=200, verbose_name='网站简介')
    keywords = models.CharField(max_length=300, verbose_name='关键字')
    hitokoto_status = models.BooleanField(default=True,verbose_name='是否启用自动获取一言,默认打开')
    favicon = models.ImageField(upload_to='image/private/', null=True, blank=True, verbose_name='icon',help_text='网站的favicon')
    avatar = models.ImageField(upload_to='image/private/', null=True, blank=True, verbose_name='头像',help_text='主页中间和内容页底部显示的头像')
    logo = models.ImageField(upload_to='image/private/', null=True, blank=True, verbose_name='顶部logo',help_text='导航栏最左侧跳动的logo')
    f_logo = models.ImageField(upload_to='image/private/', null=True, blank=True, verbose_name='底部logo',help_text='网站底部旋转logo')
    site_copyright = models.CharField(max_length=50, verbose_name='版权',help_text='可以使用a标签的形式添加需要跳转的链接')
    icp = models.CharField(max_length=20, null=True, blank=True, verbose_name='备案号')
    analytics_code = models.TextField(max_length=1000, null=True, blank=True, verbose_name='网站统计代码')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '网站基础信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.site_name

    def clean(self):
        if SiteInfo.objects.exclude(pk=self.pk).count():
            raise ValidationError(_('只能有一个配置'))


class FriendCategory(models.Model):
    name = models.CharField(max_length=20, verbose_name='友链分类名称')

    class Meta:
        verbose_name = '友链分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class FriendLink(models.Model):
    name = models.CharField(max_length=20, verbose_name='名称')
    description = models.CharField(max_length=100, null=True, blank=True, verbose_name='简单描述')
    url = models.URLField(max_length=200,verbose_name='链接')
    logo_url = models.URLField(max_length=200,verbose_name='logo链接')
    category = models.ForeignKey(FriendCategory,verbose_name='分类')
    add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')

    class Meta:
        verbose_name = '友链设置'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name



# class NavigationBar(models.Model):
#     name = models.CharField(max_length=20, verbose_name='名称')
#     parents = models.ForeignKey('self',null=True, blank=True, verbose_name='父级导航',help_text='空表示为一级导航,选择会成为其下的导航')
#     index = models.IntegerField(verbose_name='顺序',help_text='排列的顺序,0在最左端依次向右排列')
#     add_time = models.DateTimeField(auto_now_add=True, verbose_name='添加时间')
#
#     class Meta:
#         ordering = ['index']
#         verbose_name = '导航栏设置'
#         verbose_name_plural = verbose_name
#
#     def __str__(self):
#         return self.name
