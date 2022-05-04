from rest_framework import serializers
from .models import Deck, Word


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['id', 'words', 'deck_streak']
        depth = 1


class WordSerializer(serializers.ModelSerializer):
    model = Word
    fields = ['deck_id', 'word_id']
