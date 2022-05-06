from django.urls import path, include
from . import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_decks),
    path('update_word/<str:word_search>/', views.update_word),
    path('get_word/<str:word_search>/', views.get_word)
]
