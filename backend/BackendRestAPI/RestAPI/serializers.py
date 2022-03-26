from rest_framework import serializers
from .Models.Todo import Todo

class TodoSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    description = serializers.FloatField()
    age = serializers.IntegerField(required=False, default = 18)

    def create(self, validated_data):
        return Todo.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.age = validated_data.get('age', instance.age)

        instance.save()

        return instance

    class Meta:
        model = Todo
        fields = ("__all__")