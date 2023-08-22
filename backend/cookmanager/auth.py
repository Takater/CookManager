"""
    Authorization and permission functions
"""
from django.contrib.auth.hashers import make_password, check_password

def hash_pw(password):
    return make_password(password)

def validate_pw(password, hashed):
    return check_password(password, hashed)