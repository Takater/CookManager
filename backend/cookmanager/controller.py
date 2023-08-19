from django.http import JsonResponse
from django.shortcuts import render

def stock(request):
    return JsonResponse({
        'code': 200,
        'method': request.method,
        'message': 'Working fine'
    })