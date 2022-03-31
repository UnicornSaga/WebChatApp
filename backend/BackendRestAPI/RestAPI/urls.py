from django.urls import re_path,path
from RestAPI import views

urlpatterns = [
    re_path(r'^user/$', views.user_list),
    path('user/<str:email>', views.user_detail),
]