from rest_framework import serializers
from .models import Conversation,CoversationMessage
from useraccount.serializers import UserDetailSerializer

class ConversationListSerializer(serializers.ModelSerializer):
    users= UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model=Conversation
        fields=('id', 'users', 'modified_at',)