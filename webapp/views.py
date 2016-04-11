from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.staticfiles.views import serve as serve_static

from user_agents import parse

def index(request):
    context = {}

    user_agent = parse(request.META['HTTP_USER_AGENT'])

    if user_agent.is_pc:
        return render(request, 'index.html', context)
    else:
        return render(request, 'mobile.html', context)
