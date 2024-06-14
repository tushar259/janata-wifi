from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('apiview', views.my_api_view, name="my_api_view"),
    path('get_json_data', views.get_json_data, name="get_json_data"),
]