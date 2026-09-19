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

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=(
            'id','name','avatar_url'
        )