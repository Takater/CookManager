"""
    Authorization and permission functions
"""
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken

def hash_pw(password):
    return make_password(password)

def validate_pw(password, hashed):
    return check_password(password, hashed)

def generate_token(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)