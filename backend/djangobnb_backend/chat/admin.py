from django.contrib import admin

from .models import Conversation, ConverstaionMessage

# Register your models here.
admin.site.register(Conversation)
admin.site.register(ConverstaionMessage)
