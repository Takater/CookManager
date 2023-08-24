from django.http import JsonResponse
from django.shortcuts import render
from .models import Module, BaseUser
from .auth import hash_pw, validate_pw, generate_token

def stock(request):
    return JsonResponse({
        'code': 200,
        'method': request.method,
        'message': 'Working fine'
    })


def loadmodules(request):
    """
        Route to load modules list
        with id and name
    """
    modules = Module.objects.all()

    modules_list = [
        {
            'id': module.id,
            'name': module.name
        }
    for module in modules]

    return JsonResponse({
        'modules': modules_list
    })

def login(request):
    """
        Route to login user after 
        validating inserted data
    """
    if request.method == 'GET':
        email = request.headers.get('username')
        password = request.headers.get('password')
        token = request.headers.get('cookmanager-user-token')
        keeplogged = request.headers.get('keep-logged')

        if email:
            try:
                user = BaseUser.objects.get(email=email)
                user_hash = user.password
                if not validate_pw(password, user_hash):
                    return JsonResponse({
                        'code': 400,
                        'message': 'Senha incorreta'
                    })
                
                user_token = generate_token(user) if keeplogged else None
                user.token = user_token
                user.save()
                
                # Validated login
                return JsonResponse({
                    'code': 200,
                    'user': {
                        'name': user.name,
                        'phone': user.phone,
                        'perms': user.permissions,
                        'staff': user.is_staff,
                        'token': user_token
                    }
                })
                
            except BaseUser.DoesNotExist:
                return JsonResponse({
                    'code': 404,
                    'message': 'Usuário não cadastrado'
                })
        elif token:
            try:
                user = BaseUser.objects.get(token=token)

                # Validated token
                return JsonResponse({
                    'code': 200,
                    'user': {
                        'name': user.name,
                        'phone': user.phone,
                        'perms': user.permissions,
                        'staff': user.is_staff,
                        'token': token
                    }
                })
            except BaseUser.DoesNotExist:
                return JsonResponse({
                    'code': 500,
                    'message': 'Token inválido'
                })

