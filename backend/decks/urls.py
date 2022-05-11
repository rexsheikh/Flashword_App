from django.urls import path, include
from . import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_decks),
    path('update_word_score/<str:word_search>/<int:score>/',
         views.update_word_score),
    path('get_word/<str:word_search>/', views.get_word),
    path('add_word/<int:pk>/<str:word>/', views.add_word),
    path('word_list/', views.word_list),
    path('get_deck/<int:pk>/', views.get_deck),
    path('date_list/', views.date_list),
    path('update_word_reviews/<str:word_search>/<str:date>/',
         views.update_word_reviews),
]
