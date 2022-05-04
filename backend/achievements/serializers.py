from rest_framework import serializers
from .models import Achievement


class AchievementSerializer(serializers.ModelSerializer):
    model = Achievement
    fields = ['id', 'description']
