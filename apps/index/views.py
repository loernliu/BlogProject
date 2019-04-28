from django.shortcuts import render

from base.models import SiteInfo
# Create your views here.

def index(request):
    return render(request,'blog/index.html')