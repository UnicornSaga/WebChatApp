from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from .Models.Users import User
from RestAPI.serializers import UserSerializer


# Create your views here.
class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

class UserViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    # queryset = User.objects.all()
    serializer_class = UserSerializer

    lookup_field = 'email'
    lookup_value_regex = '[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}'

    def list(self, request):
        # GET - Show all users
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return JSONResponse(serializer.data)

    def create(self, request):
        # POST - Add new user
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JSONResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, email=None):
        # GET - Show <email> user
        user = User.objects.get_or_create(email=email)
        serializer = UserSerializer(user[0])
        return JSONResponse(serializer.data)

    def partial_update(self, request, email=None):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, email=None):
        # DETELE - Delete <email> user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)