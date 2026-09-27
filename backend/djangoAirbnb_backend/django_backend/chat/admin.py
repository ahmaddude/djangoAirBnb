from django.contrib import admin
from .models import Conversation, CoversationMessage

admin.site.register(Conversation)
admin.site.register(CoversationMessage)
