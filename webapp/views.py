from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.staticfiles.views import serve as serve_static

def index(request):
    context = {}
    return render(request, 'index.html', context)
