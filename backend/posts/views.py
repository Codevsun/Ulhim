from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Post, Project
from .serializers import PostSerializer, ProjectSerializer
from django.utils import timezone
from datetime import timedelta

# Create your views here.

class BaseViewSet(viewsets.ModelViewSet):
    def apply_filters(self, queryset, filters):
        filter_conditions = Q()
        
        # General filters
        if 'popular' in filters:
            filter_conditions |= Q(is_popular=True)
        if 'trending' in filters:
            filter_conditions |= Q(is_trending=True)
        if 'recent' in filters:
            filter_conditions |= Q(created_at__gte=timezone.now() - timedelta(days=7))
        if 'following' in filters:
            following_users = self.request.user.following.all()
            filter_conditions |= Q(author__in=following_users)
            
        # Level filters
        level_filters = [f for f in filters if f in dict(Post.LEVEL_CHOICES)]
        if level_filters:
            filter_conditions |= Q(level__in=level_filters)
            
        # Major filters
        major_filters = [f for f in filters if f in dict(Post.MAJOR_CHOICES)]
        if major_filters:
            filter_conditions |= Q(major__in=major_filters)
            
        if filter_conditions:
            queryset = queryset.filter(filter_conditions)
            
        return queryset.distinct()

class PostViewSet(BaseViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_queryset(self):
        queryset = Post.objects.all()
        filters = self.request.query_params.getlist('filters[]', [])
        return self.apply_filters(queryset, filters)

    @action(detail=False, methods=['get'])
    def filter_options(self, request):
        return Response({
            'general': ['all', 'popular', 'recent', 'following', 'trending'],
            'levels': [choice[0] for choice in Post.LEVEL_CHOICES],
            'major': [choice[0] for choice in Post.MAJOR_CHOICES]
        })

class ProjectViewSet(BaseViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get_queryset(self):
        queryset = Project.objects.all()
        filters = self.request.query_params.getlist('filters[]', [])
        return self.apply_filters(queryset, filters)

    @action(detail=False, methods=['get'])
    def filter_options(self, request):
        return Response({
            'general': ['all', 'popular', 'recent', 'following', 'trending'],
            'levels': [choice[0] for choice in Project.LEVEL_CHOICES],
            'major': [choice[0] for choice in Project.MAJOR_CHOICES]
        })


