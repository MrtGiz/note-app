from django.urls import path

from . import views

urlpatterns = [
    path('index/', views.index),
    path('note_list/', views.GetNoteList.as_view(), name='note_list'),
    path('note_list_test/', views.NoteList.as_view()),
    path('note_detail/', views.ApiNoteDetail.as_view()),
    path('note_detail/<uuid:pk>', views.ApiNoteDetail.as_view()),
]
