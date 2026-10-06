from dj_rest_auth.registration.serializers import RegisterSerializer as BaseRegisterSerializer
from .models import User
from rest_framework import serializers


class RegisterSerializer(BaseRegisterSerializer):
    username = None

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'password': self.validated_data.get('password1', ''),
        }

    def validate_username(self, username):
        return None

    def save(self, request):
        user = super().save(request)
        user.name = self.validated_data.get('email', '').split('@')[0]
        user.save(update_fields=['name'])
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    properties_count = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields=(
            'id','name','avatar_url','properties_count'
        )
    def get_properties_count(self, obj):
        return obj.properties.count()