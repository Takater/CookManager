from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class BaseUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11)
    name = models.TextField(max_length=40)

    def __init__(self, user_id):
        self.id = user_id
        return self
    
class StaffUser(BaseUser):
    staff_id = models.CharField(unique=True)