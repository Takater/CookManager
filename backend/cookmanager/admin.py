from django.contrib import admin
from .models import BaseUser, Module, Permission

# Register your models here.
admin.site.register(BaseUser)
admin.site.register(Module)
admin.site.register(Permission)
