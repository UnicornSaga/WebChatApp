from django.urls import re_path
from RestAPI import views

urlpatterns = [
    re_path(r'^todo/$', views.todo_list),
    re_path(r'^todo/(?P<pk>[0-9]+)/$', views.todo_detail)
]