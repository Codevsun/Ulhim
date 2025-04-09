from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, ProjectViewSet, CommentViewSet, get_year_stats

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'projects', ProjectViewSet)
router.register(
    r'posts/(?P<post_pk>[^/.]+)/comments',
    CommentViewSet,
    basename='post-comments'
)

urlpatterns = [
    path('', include(router.urls)),
    path('year/<int:year_number>/stats/', get_year_stats, name='year-stats'),
]