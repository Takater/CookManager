from django.db.models.signals import post_migrate, post_save
from django.dispatch import receiver
from .models import Module, Permission, BaseUser, StaffUser, Job

# Create hired modules
@receiver(post_migrate)
def create_modules(sender, **kw):
    if sender.name == 'cookmanager':
        initial_modules = ['Configurações', 'Estoque'] # Change to add modules
        for module_name in initial_modules:
            Module.objects.get_or_create(name=module_name)

# Create all permissions to each hired modules
@receiver(post_migrate)
def create_permissions(sender, **kw):
    if sender.name == 'cookmanager':
        for module in Module.objects.all():
            actions = ['Adicionar', 'Alterar', 'Deletar', 'Ver']

            for action in actions: 
                name = f"{action.lower()}_{module.name.lower()}"
                description = f"Pode {action.lower()} itens em {module.name.capitalize()}"

                # Permission object with name, description and module reference
                Permission.objects.get_or_create(name=name, description=description, module=module)

# Create initial job positions
@receiver(post_migrate)
def create_jobs(sender, **kw):
    if sender.name == 'cookmanager':
        
        # Create only when there are none 
        if len(Job.objects.all()) == 0:
            jobs = ['Atendente', 'Garçom', 'Cozinheiro', 'Chef', 'Gerente'] # Initial data
            for job in jobs:
                Job.objects.get_or_create(name=job)

# Create Staff User whenever Base user is Staff
@receiver(post_save, sender=BaseUser)
def create_staff_user(sender, instance, created, **kw):
    if created and instance.Colaborador:
        job = instance.job
        StaffUser.objects.create(base_user=instance, job=job)