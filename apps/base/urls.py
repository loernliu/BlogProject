from django.conf.urls import url

from .views import friends_view

urlpatterns = [
    url(r'^friends/$',friends_view,name='friends')
]
