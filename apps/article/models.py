from django.db import models
from uuslug import slugify, uuslug


# Create your models here.

class Article(models.Model):
    """文章"""
    STATUS_CHOICES = (
        ('d', '草稿'),
        ('p', '发表'),
    )
    COMMENT_STATUS = (
        ('o', '打开'),
        ('c', '关闭'),
    )
    TYPE = (
        ('a', '文章'),
        ('p', '页面'),
    )
    title = models.CharField(verbose_name='标题', max_length=200)
    slug = models.SlugField(unique=True, blank=True, verbose_name='别名',
                            help_text='“别名”是在URL中使用的别称，通常使用小写，只能包含字母，数字和连字符（-）,不写默认为标题拼音')
    img_link = models.CharField(verbose_name='图片地址', help_text='文章封面图,URL形式填写', default='', max_length=255)
    # content = MDTextField('正文')
    content = models.TextField(verbose_name='正文')
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    last_mod_time = models.DateTimeField('修改时间', auto_now=True)
    status = models.CharField(verbose_name='文章状态', max_length=1, choices=STATUS_CHOICES, default='p')
    comment_status = models.CharField(verbose_name='评论状态', max_length=1, choices=COMMENT_STATUS, default='o')
    type = models.CharField(verbose_name='类型', max_length=1, choices=TYPE, default='a')
    views = models.PositiveIntegerField(verbose_name='浏览量', default=0)
    category = models.ForeignKey('Category', verbose_name='分类', on_delete=models.CASCADE, blank=False, null=False)
    tags = models.ManyToManyField('Tag', verbose_name='标签集合', blank=True)

    class Meta:
        verbose_name = '文章'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.slug == '':
            self.slug = uuslug(self.title, instance=self)
            super(Article, self).save(*args, **kwargs)


class Category(models.Model):
    """分类"""
    name = models.CharField(verbose_name='分类名', max_length=30, unique=True)
    parent_category = models.ForeignKey('self', verbose_name="父级分类", blank=True, null=True, on_delete=models.CASCADE)
    slug = models.SlugField(unique=True, verbose_name='别名', help_text='“别名”是在URL中使用的别称，通常使用小写，只能包含字母，数字和连字符（-）')
    image = models.ImageField(upload_to='images/bg/',verbose_name='背景图')
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    last_mod_time = models.DateTimeField('修改时间', auto_now=True)

    class Meta:
        verbose_name = '分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(verbose_name='标签名', max_length=30, unique=True)
    slug = models.SlugField(unique=True, verbose_name='别名', help_text='“别名”是在URL中使用的别称，通常使用小写，只能包含字母，数字和连字符（-）')
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    last_mod_time = models.DateTimeField('修改时间', auto_now=True)

    class Meta:
        verbose_name = '标签'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name
