from django.http import Http404, JsonResponse, HttpResponse
from django.core import serializers
from django.views.generic import View
from django.shortcuts import render, get_object_or_404
from django.core.exceptions import PermissionDenied
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView
from django.urls import reverse_lazy
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .serializers import NoteSerializer, CategorySerializer
from .models import Note, Category


@login_required
def index(request):
    return render(request, 'notes/index.html')


class GetNoteList(ListAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        if self.request.user.is_anonymous:
            raise PermissionDenied()
        query_list = Note.objects.filter(owner=self.request.user)
        created = self.request.query_params.get('created', None)
        title = self.request.query_params.get('title', None)
        category = self.request.query_params.get('category', None)
        is_favorite = self.request.query_params.get('is_favorite', None)
        sort_by = self.request.query_params.get('sort_by', None)
        # filters
        if created:
            query_list = query_list.filter(dtcreate__date=created)
        if title:
            query_list = query_list.filter(title__startswith=title)
        if category:
            query_list = query_list.filter(category=category)
        if is_favorite:
            # bookmark = bookmark == 'True'
            query_list = query_list.filter(bookmark=bookmark)
        # sort
        if sort_by == 'category':
            query_list = query_list.order_by('category')
        elif sort_by == 'is_favorite':
            query_list = query_list.order_by('is_favorite')
        return query_list


class NoteList(APIView):
    """
    Вывод списка записок
    подкорректировал формат вывода - добавлен ключ "data" для обработки ридером
    в хранилище ExtJs
    """
    def get(self, request):
        notes = Note.objects.filter(owner=self.request.user)
        serializer = NoteSerializer(notes, many=True)
        result = dict({'data': serializer.data})
        return JsonResponse(result)


class ApiNoteDetail(APIView):

    def get(self, request, pk):
        object = get_object_or_404(Note, pk=pk)
        if not object.is_published and object.owner != request.user:
            raise PermissionDenied()
        serializer = NoteSerializer(object)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = request.data
        data['owner'] = request.user.id
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        object = get_object_or_404(Note, pk=pk)
        if not object.is_published and object.owner != request.user:
            raise PermissionDenied()
        object.delete()
        return HttpResponse(status=204)

    def put(self, request, pk):
        object = get_object_or_404(Note, pk=pk)
        if not object.is_published and object.owner != request.user:
            raise PermissionDenied()
        serializer = NoteSerializer(object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=204)
        else:
            return JsonResponse(serializer.errors, status=400)
