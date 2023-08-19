from typing import Any
from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11)
    name = models.TextField(max_length=40)
    staff = models.BooleanField(default=False)

    def to_staff(self):
        self.staff = True

    def __init__(self, user_id):
        self.id = user_id
        return self