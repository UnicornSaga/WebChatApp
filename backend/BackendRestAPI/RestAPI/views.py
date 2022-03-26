from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from .Models.Todo import Todo
from RestAPI.serializers import TodoSerializer

# Create your views here.
class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def todo_list(request):
    if request.method == 'GET':
        Todos = Todo.objects.all()
        Todo_serializer = TodoSerializer(Todos, many=True)
        return JSONResponse(Todo_serializer.data)
    elif request.method == 'POST':
        Todo_data = JSONParser().parse(request)
        Todo_serializer = TodoSerializer(data=Todo_data)
        if Todo_serializer.is_valid():
            Todo_serializer.save()
            return JSONResponse(Todo_serializer.data, status=status.HTTP_201_CREATED)
        return JSONResponse(Todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def todo_detail(request, name):
    try:
        todo = Todo.objects.get(name=name)
    except Todo.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        todo_serializer = TodoSerializer(todo)
        return JSONResponse(todo_serializer.data)
    elif request.method == 'PUT':
        todo_data = JSONParser().parse(request)
        todo_serializer = TodoSerializer(todo, data=todo_data)
        if todo_serializer.is_valid():
            todo_serializer.save()
            return JSONResponse(todo_serializer.data)
        return JSONResponse(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        todo.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)