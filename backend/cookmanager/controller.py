from django.http import JsonResponse
from django.shortcuts import render
from .models import Module

def stock(request):
    return JsonResponse({
        'code': 200,
        'method': request.method,
        'message': 'Working fine'
    })

def loadmodules(request):
    modules = Module.objects.all()

    # Set modules as a list of objects
    modules_list = [
        {
            'id': module.id,
            'name': module.name
        }
        for module in modules
    ]

    return JsonResponse({
        'modules': modules_list
    })