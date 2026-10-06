from .serializers import UserDetailSerializer
from .models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes,parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from property.serializers import ReservationsListSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request,pk):
    user=User.objects.get(pk=pk)

    serializer=UserDetailSerializer(user, many=False)

    return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser])
def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)

    if request.method == 'POST':
        if request.user.id != user.id:
            return Response({'error': 'Forbidden'}, status=403)

        file = request.FILES.get('avatar')
        if not file or not file.content_type.startswith('image/'):
            return Response({'error': 'Invalid image'}, status=400)
        if file.size > 5 * 1024 * 1024:
            return Response({'error': 'Max 5MB'}, status=400)

        user.avatar = file
        user.save()

    return Response(UserDetailSerializer(user, context={'request': request}).data)

@api_view(['GET'])
def reservations_list(request):
    reservations=request.user.reservations.all()
    serializer= ReservationsListSerializer(reservations, many=True)
    return JsonResponse(serializer.data, safe=False)