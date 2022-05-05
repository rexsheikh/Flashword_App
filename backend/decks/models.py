from django.db import models
from authentication.models import User


class Word(models.Model):
    score = models.IntegerField()
    word = models.CharField(max_length=255, default='')
    definition = models.CharField(max_length=255, default='')
    date_started = models.DateField(auto_now=True)


class Deck(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    words = models.ManyToManyField(Word)
    deck_streak = models.IntegerField()


# Create your models here.
