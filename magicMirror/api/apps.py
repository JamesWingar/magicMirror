from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        from .scheduler import scheduler
        scheduler.remove_all()
        scheduler.update_all()
        scheduler.start()
        return
