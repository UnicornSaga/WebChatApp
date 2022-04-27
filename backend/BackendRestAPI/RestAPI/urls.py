from sys import prefix
from xml.etree.ElementInclude import include
from django.urls import re_path,path, include
from rest_framework.routers import DefaultRouter
from RestAPI import views

router = DefaultRouter()
router.register(prefix=r'users', viewset=views.UserViewset, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]