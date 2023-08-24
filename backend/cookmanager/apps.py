from django.apps import AppConfig


class CookmanagerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cookmanager'

    def ready(self):
        import cookmanager.signals