from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action, api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.db.models import Count
from .models import Post, Project, Comment, Like
from .serializers import (
    PostSerializer, 
    ProjectSerializer,
    CommentSerializer,
    LikeSerializer
)
from accounts.models import StudentUser

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('author').prefetch_related('likes', 'comments')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(
            author=user,
            level=user.year_in_college,
            major=user.major
        )

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        
        like, created = Like.objects.get_or_create(
            user=user,
            post=post
        )
        
        if not created:
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
            
        return Response(LikeSerializer(like).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        post = self.get_object()
        comments = post.comments.select_related('author')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related('author').prefetch_related('collaborators')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(
            author=user,
            level=user.year_in_college,
            major=user.major
        )

    @action(detail=True, methods=['post'])
    def add_collaborator(self, request, pk=None):
        project = self.get_object()
        collaborator_id = request.data.get('user_id')
        
        try:
            collaborator = StudentUser.objects.get(id=collaborator_id)
            project.collaborators.add(collaborator)
            return Response(status=status.HTTP_200_OK)
        except StudentUser.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if 'post_pk' in self.kwargs:
            return Comment.objects.filter(post_id=self.kwargs['post_pk'])
        return Comment.objects.all()

    def perform_create(self, serializer):
        if 'post_pk' in self.kwargs:
            post = get_object_or_404(Post, pk=self.kwargs['post_pk'])
            serializer.save(
                author=self.request.user,
                post=post
            )
        else:
            serializer.save(author=self.request.user)

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_year_stats(request, year_number):
    user = request.user
    
    # Get posts stats for the specified year
    posts = Post.objects.filter(author=user, level=year_number)
    posts_by_category = posts.values('tag').annotate(count=Count('id'))
    
    # Get projects stats for the specified year
    projects = Project.objects.filter(author=user, level=year_number)
    projects_by_status = projects.values('status').annotate(count=Count('id'))
    
    # Format the response
    stats = {
        'posts': {
            'total': posts.count(),
            'byCategory': {
                'article': 0,
                'achievement': 0,
                'certificate': 0,
                'inspiration': 0,
                'collaboration': 0,
                'idea': 0
            }
        },
        'projects': {
            'total': projects.count(),
            'byStatus': {
                'planning': 0,
                'in_progress': 0,
                'completed': 0,
                'graduation_project': 0
            }
        }
    }
    
    # Fill in the actual counts
    for post_category in posts_by_category:
        stats['posts']['byCategory'][post_category['tag']] = post_category['count']
        
    for project_status in projects_by_status:
        stats['projects']['byStatus'][project_status['status']] = project_status['count']
    
    return Response(stats)


