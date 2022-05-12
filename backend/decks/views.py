from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Deck, Word, Date
from .serializers import DeckSerializer, WordSerializer, DateSerializer
from django.core.exceptions import ObjectDoesNotExist
from datetime import date
from django.db.models import Avg

# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_decks(request):
    print(
        'User DECKS', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = DeckSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        decks = Deck.objects.filter(user_id=request.user.id)
        serializer = DeckSerializer(decks, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def word_list(request):
    if request.method == 'GET':
        words = Word.objects.all()
        serializer = WordSerializer(words, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = WordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_word(request, word_search):
    word = Word.objects.get(word=word_search)
    serializer = WordSerializer(word)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_deck(request, pk):
    if request.method == 'GET':
        deck = get_object_or_404(Deck, pk=pk)
        serializer = DeckSerializer(deck)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = DeckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def add_word(request, title_search, word):
    deck = get_object_or_404(Deck, title=title_search)
    word = get_object_or_404(Word, word=word)
    deck.words.add(word)
    serializer = DeckSerializer(deck, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@ api_view(['PATCH'])
@ permission_classes([IsAuthenticated])
def update_word_score(request, word_search, score):
    word = get_object_or_404(Word, word=word_search)
    word.score += score
    word_serializer = WordSerializer(word, data=request.data, partial=True)
    if word_serializer.is_valid():
        word_serializer.save()
        return Response(word_serializer.data, status=status.HTTP_201_CREATED)


@ api_view(['PATCH'])
@ permission_classes([IsAuthenticated])
def update_word_reviews(request, word_search, date_search):
    word = get_object_or_404(Word, word=word_search)
    dates = word.dates.all()
    try:
        date = dates.order_by('date').first()
        date.reviews += 1
        date.save()
    except ObjectDoesNotExist:
        new_date = word.dates.create(date=date_search)
        new_date.reviews += 1
        new_date.save()
        print(new_date)
    word_serializer = WordSerializer(word, data=request.data, partial=True)
    if word_serializer.is_valid():
        word_serializer.save()
        return Response(word_serializer.data, status=status.HTTP_201_CREATED)


@ api_view(['GET', 'POST'])
@ permission_classes([IsAuthenticated])
def word_list(request):
    if request.method == 'GET':
        words = Word.objects.all()
        serializer = WordSerializer(words, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = WordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@ api_view(['GET', 'POST'])
@ permission_classes([IsAuthenticated])
def date_list(request):
    if request.method == 'GET':
        dates = Date.objects.all()
        serializer = DateSerializer(dates, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def review_average(request):
    custom_dict = {}
    dates = Date.objects.all().aggregate(Avg('reviews'))
    custom_dict['total'] = dates
    return Response(custom_dict)


@ api_view(['DELETE'])
@ permission_classes([IsAuthenticated])
def delete_deck(request, deck_title):
    deck = get_object_or_404(Deck, title=deck_title)
    deck.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@ api_view(['DELETE'])
@ permission_classes([IsAuthenticated])
def delete_word(request, word_search):
    word = get_object_or_404(Word, word=word_search)
    word.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
