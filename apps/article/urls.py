from django.conf.urls import url
from .views import ArticleListView,DetailView

urlpatterns = [
    # url(r'^article/(?P<slug>[\w-]+)/$', ArticleDetailView.as_view(), name='detail'),  # 文章内容页
    # url(r'^article/(?P<slug>[\w-]+)/$', ArticleListView.as_view(), name='detail'),  # 文章内容页

]
