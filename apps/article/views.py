from django.shortcuts import render
from django.views.generic import ListView, DetailView, View

from .models import Article,Tag,Category

# Create your views here.


class ArticleListView(ListView):
    model = Article
    template_name ='blog/list.html'
    context_object_name = 'articles'
    paginate_by = 10


# class IndexView(ListView):
#     model = Article