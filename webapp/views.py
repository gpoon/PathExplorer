from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.staticfiles.views import serve as serve_static

from user_agents import parse

def index(request):
    context = {}

    js_suffix = '.js' if settings.DEBUG else '.min.js'
    user_agent = parse(request.META['HTTP_USER_AGENT'])

    if user_agent.is_pc:
        context['js_url'] = '/static/app.bundle' + js_suffix
        return render(request, 'index.html', context)
    else:
        context['js_url'] = '/static/mobile.bundle' + js_suffix
        return render(request, 'mobile.html', context)
