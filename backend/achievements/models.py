from django.db import models

# Create your models here.


class Achievement(models.Model):
    description = models.CharField(max_length=255)
