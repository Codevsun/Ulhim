from rest_framework import serializers
from .models import Post, Project
from accounts.models import StudentUser

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = ['id', 'username', 'name', 'image']

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    stats = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'tag', 'level', 'major', 
                 'created_at', 'stats', 'is_trending', 'is_popular']

    def get_stats(self, obj):
        return {
            'inspired': obj.inspired_count,
            'comments': obj.comments_count
        }

class ProjectSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    stats = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'author', 'name', 'image', 'description', 'badge', 
                 'rating', 'level', 'major', 'created_at', 'stats', 
                 'is_trending', 'is_popular']

    def get_stats(self, obj):
        return {
            'inspired': obj.inspired_count
        } 