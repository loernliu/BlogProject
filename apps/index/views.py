from django.shortcuts import render

from article.views import ArticleListView
from base.models import SiteInfo
# Create your views here.

class IndexView(ArticleListView):
    template_name = 'blog/index.html'


# def index(request):
#     return render(request,'blog/index.html')