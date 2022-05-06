from webbrowser import get
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Deck, Word
from .serializers import DeckSerializer, WordSerializer

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
    if request.method == 'GET':
        word = Word.objects.get(word=word_search)
        serializer = WordSerializer(word)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def add_word(request, pk, word):
    response_dict = {}
    deck = get_object_or_404(Deck, pk=pk)
    word = get_object_or_404(Word, word=word)
    deck.words.add(word)
    response_dict['deck'] = deck.title
    response_dict['word'] = word.word
    serializer = DeckSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(response_dict)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def update_word(request, word_search):
    word = get_object_or_404(Word, word=word_search)
    word_serializer = WordSerializer(word, data=request.data, partial=True)
    if word_serializer.is_valid():
        word_serializer.save()
        return Response(word_serializer.data, status=status.HTTP_201_CREATED)


@ api_view(['PATCH'])
@ permission_classes([IsAuthenticated])
def update_word(request, word_search):
    word = get_object_or_404(Word, word=word_search)
    word_serializer = WordSerializer(word, data=request.data, partial=True)
    if word_serializer.is_valid():
        word_serializer.save()
        return Response(word_serializer.data, status=status.HTTP_201_CREATED)
