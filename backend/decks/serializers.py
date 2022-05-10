from rest_framework import serializers
from .models import Deck, Word, Date


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['id', 'title', 'words', 'deck_streak', 'user_id']
        depth = 2


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['score', 'word', 'definition', 'date_started']


class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = ['date']
