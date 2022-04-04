from xml.etree.ElementInclude import include
from django.urls import re_path,path, include
from rest_framework.routers import DefaultRouter
from RestAPI import views

router = DefaultRouter()
router.register(r'user', views.UserViewset)
router.register('user/<str:email>', views.UserViewset)


urlpatterns = [
    path('', include(router.urls)),
]