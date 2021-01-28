from django.urls import path
from .views import FrontendRenderView


urlpatterns = [
    path('', FrontendRenderView.as_view(), name='home'),
]
