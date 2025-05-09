from rest_framework import serializers
from .models import Post, Project, Comment, Like
from accounts.serializers import StudentUserSerializer

class PostSerializer(serializers.ModelSerializer):
    author = StudentUserSerializer(read_only=True)
    like_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = [
            'id', 'author', 'content', 'tag', 'image',
            'created_at', 'like_count', 'comment_count',
            'inspired_count', 'level', 'major', 'slug', 'is_liked'
        ]
        read_only_fields = ['author', 'slug']

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_comment_count(self, obj):
        return obj.comments.count()
        
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

class ProjectSerializer(serializers.ModelSerializer):
    author = StudentUserSerializer(read_only=True)
    collaborators = StudentUserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'author', 'name', 'description', 'status',
            'tags', 'image', 'collaborators', 'created_at',
            'level', 'major', 'slug'
        ]
        read_only_fields = ['author', 'slug']

class CommentSerializer(serializers.ModelSerializer):
    author = StudentUserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'created_at', 'updated_at']
        read_only_fields = ['author']

class LikeSerializer(serializers.ModelSerializer):
    user = StudentUserSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'created_at']
        read_only_fields = ['user']