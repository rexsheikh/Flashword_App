from django.contrib import admin
from .models import Car
from achievements.models import Achievement
from decks.models import Deck, Word, Date

# Register your models here.
admin.site.register(Car)
admin.site.register(Achievement)
admin.site.register(Deck)
admin.site.register(Word)
admin.site.register(Date)
