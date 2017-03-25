from __future__ import unicode_literals

from django.db import models


class Synonym(models.Model):
    verbose_name = 'synonym'
    verbose_name_plural = 'synonyms'

    SYNONYM_TYPES = (
        ('I', 'Index Time'),
        ('Q', 'Query Time'),
        ('C', 'Category'),
        ('S', 'Suggest')
    )

    lhs = models.CharField(max_length=100, blank=False)
    rhs = models.CharField(max_length=100, blank=False)
    type = models.CharField(max_length=50, choices=SYNONYM_TYPES, blank=False,
                            default="Q")
    date_added = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    user_added = models.CharField(max_length=100, blank=False, default="Admin")
    user_last_modified = models.CharField(max_length=100, blank=False,
                                          default="Admin")
