from django.http import JsonResponse

from rest_framework.decorators import api_view

from .models import Conversation,ConversationMessage
from .serializers import ConversationListSerializer,ConversationDetailSerializer,ConversationMessageSerializer


@api_view(['GET'])
def conversations_list(request):
    serializer= ConversationListSerializer(
        request.user.conversations.all(),many=True
    )

    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def conversations_detail(request,pk):
    conversation = request.user.conversations.get(pk=pk)

    conversation_serializer = ConversationDetailSerializer(conversation, many=False)
    messages_serializer= ConversationMessageSerializer(conversation.messages.all(),many=True)

    return JsonResponse({
        'conversation': conversation_serializer.data,
        'messages':messages_serializer.data

    },safe=False)