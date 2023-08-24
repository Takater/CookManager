from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Module, Permission, BaseUser

@receiver(post_migrate)
def create_permissions(sender, **kw):
    if sender.name == 'cookmanager':
        for module in Module.objects.all():
            for action in ['Adicionar', 'Alterar', 'Deletar', 'Ver']: 
                name = f"{action.lower()}_{module.name.lower()}"
                description = f"Pode {action.lower()} itens em {module.name.capitalize()}"
                Permission.objects.get_or_create(name=name, description=description, module=module)

@receiver(post_migrate)
def create_modules(sender, **kw):
    if sender.name == 'cookmanager':
        initial_modules = ['Configurações', 'Estoque']
        for module_name in initial_modules:
            Module.objects.get_or_create(name=module_name)