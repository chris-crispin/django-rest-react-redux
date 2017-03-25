from __future__ import unicode_literals

from django.apps import AppConfig


class AppConfig(AppConfig):
    name = 'app'

    def ready(self):
        from api.app import signals  # noqa: F401
