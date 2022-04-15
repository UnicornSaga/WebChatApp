from rest_framework import serializers
from .Models.Users import User

class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=200)
    name = serializers.CharField(max_length=200)
    description = serializers.CharField(max_length=500)
    age = serializers.IntegerField(required=False, default = 18)
    friendlist = serializers.ListField(
        serializers.EmailField(max_length=200),
        max_length=1000,
        null = True
    )

    def create(self, validated_data):
        return User.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.age = validated_data.get('age', instance.age)
        instance.friendlist = validated_data.get('friendlist', instance.friendlist)

        instance.save()

        return instance

    class Meta:
        model = User
        fields = ("__all__")