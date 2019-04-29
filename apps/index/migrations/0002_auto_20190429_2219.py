# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-29 22:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='featureinfo',
            old_name='feature1_image_url',
            new_name='feature_image_url',
        ),
        migrations.RenameField(
            model_name='featureinfo',
            old_name='feature1_title',
            new_name='feature_title',
        ),
        migrations.RenameField(
            model_name='featureinfo',
            old_name='feature1_url',
            new_name='feature_url',
        ),
        migrations.AlterField(
            model_name='socialinfo',
            name='name',
            field=models.CharField(choices=[('bilibili', 'bilibili'), ('douban', '豆瓣'), ('facebook', 'facebook'), ('github', 'github'), ('lofter', 'lofter'), ('qq', 'qq'), ('qzone', 'QQ空间'), ('sina', '微博'), ('twitter', 'twitter'), ('wangyiyun', '网易云'), ('wechat', 'wechat'), ('zhihu', '知乎')], max_length=10),
        ),
    ]