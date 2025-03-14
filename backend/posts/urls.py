from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, ProjectViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
] 