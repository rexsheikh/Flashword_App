from django.urls import path, include
from . import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_decks),
    path('update_word/<int:pk>/<int:scoreUpdate>/', views.update_word),
    path('get_word/<int:pk>/', views.get_word)
]
