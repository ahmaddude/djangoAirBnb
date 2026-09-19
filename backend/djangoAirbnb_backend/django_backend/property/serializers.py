from rest_framework import serializers
from useraccount.serializers import UserDetailSerializer
from .models import Property

class PropertiesListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Property
        fields=(
            'id',
            'title',
            'price_per_night',
            'image_url',
        )



class PropertiesDetailSerializer(serializers.ModelSerializer):
    landlord= UserDetailSerializer(read_only=True, many=False)
    class Meta:
            model=Property
            fields=(
                'id',
                'title',
                'description',
                'price_per_night',
                'image_url',
                'bedrooms',
                'guests',
                'landlord'
            )