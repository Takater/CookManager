from django import forms
from django.contrib import admin
from django.contrib.auth.forms import UserCreationForm
from .models import BaseUser, Job
from django_dynamic_admin_forms.admin import DynamicModelAdminMixin

# Choose user job position when user is staff
class BaseUserStaff(DynamicModelAdminMixin, admin.ModelAdmin):
    
    dynamic_fields = ('job',)

    def get_dynamic_job_field(self, data):
        is_staff = data.get('Colaborador')
        queryset = Job.objects.all()
        chosen_job = data.get('job')
        value = chosen_job if chosen_job else queryset.first()
        hidden = not is_staff
            
        return queryset, value, hidden