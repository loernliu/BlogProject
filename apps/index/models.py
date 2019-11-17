from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
# Create your models here.

class SocialInfo(models.Model):
    SOCIAL_LIST = (
        ('bilibili','bilibili'),
        ('douban','豆瓣'),
        ('facebook','facebook'),
        ('github','github'),
        ('lofter','lofter'),
        ('qq','qq'),
        ('qzone','QQ空间'),
        ('sina','微博'),
        ('twitter','twitter'),
        ('wangyiyun','网易云'),
        ('wechat','wechat'),
        ('zhihu','知乎'),
    )
    name = models.CharField(max_length=10,choices=SOCIAL_LIST)
    url = models.URLField(max_length=200,verbose_name='链接',help_text='跳转到的链接')
    index = models.IntegerField(verbose_name='排序',help_text='越大越靠后',default=0)

    class Meta:
        ordering = ['index','pk']
        verbose_name = '社交信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class FeatureInfo(models.Model):
    feature_url = models.URLField(max_length=200,verbose_name='链接',help_text='跳转到的链接')
    feature_title = models.CharField(max_length=20,verbose_name='标题')
    feature_image_url = models.URLField(max_length=200,verbose_name='图片链接',help_text='要展示的图片的链接')

    class Meta:
        verbose_name = '推荐框信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.feature_title

    def clean(self):
        if FeatureInfo.objects.exclude(pk=self.pk).count() > 2:
            raise ValidationError(_('只能有三个配置'))


class OtherInfo(models.Model):
    bg_image = models.ImageField(upload_to='images/bg/',verbose_name='背景图',help_text='首页背景图')
    hitokoto = models.CharField(max_length=200,verbose_name='一言',help_text='hitokoto一言,默认会使用ajax自动获取,可从基础配置中关闭')
    notice = models.CharField(max_length=300,blank=True,null=True,verbose_name='通知',help_text='通知框中展示的内容')
    wechat_image = models.ImageField(upload_to='image/private/',verbose_name='微信二维码',help_text='微信二维码,社交信息中选择打开微信时才会有效')

    class Meta:
        verbose_name = '首页其他信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.hitokoto

    def clean(self):
        if OtherInfo.objects.exclude(pk=self.pk).count():
            raise ValidationError(_('只能有一个配置'))
