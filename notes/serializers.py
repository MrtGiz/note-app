from rest_framework import serializers
from .models import Note, Category


class NoteSerializer(serializers.ModelSerializer):
    category_title = serializers.CharField(
        source='category.title', read_only=True)
    owner_username = serializers.CharField(
        source='category.owner.username', read_only=True)
    class Meta:
        model = Note
        fields = ['uuid', 'title', 'body', 'category', 'category_title', 'owner',
                  'owner_username', 'is_favorite', 'is_published', 'created', 'modified']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'slug', 'owner']
