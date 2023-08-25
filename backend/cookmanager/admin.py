from django.contrib import admin
from .models import BaseUser, StaffUser, Job
from .forms import BaseUserStaff

# Register your models here.
admin.site.register(Job)
admin.site.register(BaseUser, BaseUserStaff)
