from django.conf.urls import url

from .views import friends_view,archive_view

urlpatterns = [
    url(r'^friends/$',friends_view,name='friends'),
    url(r'^archive/$',archive_view,name='archive'),

]
