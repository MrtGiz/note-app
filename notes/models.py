from django.db import models
from django.contrib.auth import get_user_model

import uuid


class Category(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    owner = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ('title',)

    def __str__(self):
        return self.title


class Note(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    body = models.TextField(blank=True, default='')
    category = models.ForeignKey(Category, related_name='notes', on_delete=models.CASCADE)
    owner = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    is_favorite = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
        ordering = ('-created', )

    def __str__(self):
        return self.title
