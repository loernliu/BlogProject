from django.views.generic import View,ListView
from django.shortcuts import render

# Create your views here.



# class FriendsView(ListView):
#     template_name = 'blog/links.html'


def friends_view(request):
    return render(request,'blog/links.html')


def archive_view(request):
    return render(request,'blog/archive.html')

