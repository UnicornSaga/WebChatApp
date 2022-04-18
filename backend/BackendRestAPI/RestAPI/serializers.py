from rest_framework import serializers
from .Models.Users import User

class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=200)
    name = serializers.CharField(required=False, max_length=200)
    description = serializers.CharField(required=False, max_length=500)
    age = serializers.IntegerField(required=False, default = 18)

    def create(self, validated_data):
        return User.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.age = validated_data.get('age', instance.age)

        instance.save()

        return instance

    class Meta:
        model = User
        fields = ("__all__")