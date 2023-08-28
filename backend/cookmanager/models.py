from typing import Any, Optional
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from .auth import hash_pw
from django.utils.timezone import now
from django.db.utils import OperationalError

class Module(models.Model):
    name = models.CharField(max_length=20, unique=True)

    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name

class Permission(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=40, default=f"Descrição {name}")
    module = models.ForeignKey(Module, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Job(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class CustomManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save()
        return user

class BaseUser(AbstractBaseUser):

    # Load jobs list
    def get_jobs():
        # Try to load jobs or set mock
        jobs = []
        try:
            jobs = [(job.name.capitalize(), job.name.capitalize()) for job in Job.objects.all()]
        except OperationalError:
            jobs = [('Administrador', 'Administrador')]
        
        return jobs
    
    # User data
    name = models.CharField(max_length=40)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11)
    password = models.CharField(max_length=128)
    token = models.CharField(max_length=128, default=None, blank=True, null=True)
    last_login = models.DateTimeField(default=now)
    is_staff = models.BooleanField(default=False, name="Colaborador")
    job = models.CharField(max_length=20, default=None, null=True, blank=True, choices=get_jobs())
    permissions = models.ManyToManyField(Permission)

    # User custom manager
    objects = CustomManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name
    

class StaffUser(models.Model):
    base_user = models.OneToOneField(BaseUser, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.job.name}_{self.base_user.name}"

