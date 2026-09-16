from dj_rest_auth.registration.serializers import RegisterSerializer as BaseRegisterSerializer


class RegisterSerializer(BaseRegisterSerializer):
    username = None

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'password': self.validated_data.get('password1', ''),
        }

    def validate_username(self, username):
        return None
