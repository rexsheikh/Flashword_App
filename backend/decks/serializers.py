from rest_framework import serializers
from .models import Deck, Word


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['id', 'title', 'words', 'deck_streak', 'user_id']
        depth = 1


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['score', 'word', 'definition', 'date_started']
