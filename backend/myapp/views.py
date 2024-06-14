from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import models
import json
import os
from django.conf import settings
# Create your views here.
@api_view(['GET', 'POST'])
def home(request):
	return HttpResponse("Hello World.")


@api_view(['POST'])
def my_api_view(request):
    data = {
        "message": "Hello, world!",
        "status": "success"
    }
    return JsonResponse(data)


@api_view(['GET'])
def get_json_data(request):
 	file = json.load(open(os.path.join(settings.BASE_DIR, 'public', 'files', 'stock_market_data.json'), 'r'))
 	return JsonResponse(file, safe=False)


