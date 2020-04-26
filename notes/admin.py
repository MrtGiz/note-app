from django.contrib import admin

# from .filters import RelatedDropdownFilter, DropdownFilter
from .models import Note, Category


class NoteAdmin(admin.ModelAdmin):
    list_display = (
        'uuid',
        'title',
        'category',
        'owner',
        'created',
        'is_favorite',
        'is_published',
    )

class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'slug',
        'owner',
    )

admin.site.register(Note, NoteAdmin)
admin.site.register(Category, CategoryAdmin)
