from django.db import models
from accounts.models import StudentUser


class BaseModel(models.Model):
    LEVEL_CHOICES = [
        ('freshman', 'Freshman'),
        ('sophomore', 'Sophomore'),
        ('junior', 'Junior'),
        ('senior', 'Senior'),
        ('graduate', 'Graduate'),
    ]

    MAJOR_CHOICES = [
        ('cs', 'Computer Science'),
        ('ai', 'Artificial Intelligence'),
        ('cys', 'Cybersecurity'),
        ('cis', 'Computer Information Systems'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(
        StudentUser, 
        on_delete=models.CASCADE, 
        related_name='posts',
        verbose_name="Author"
    )
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    image = models.ImageField(upload_to='post_images/', blank=True, null=True, verbose_name="Image")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Filter fields
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    major = models.CharField(max_length=20, choices=MAJOR_CHOICES)
    
    # Stats
    inspired_count = models.IntegerField(default=0)
    
    # Additional fields for filtering
    is_trending = models.BooleanField(default=False)
    is_popular = models.BooleanField(default=False)

    @property
    def like_count(self):
        return self.likes.count()
    
    @property
    def comment_count(self):
        return self.comments.count()

    class Meta:
        abstract = True


class Post(BaseModel):
    TAG_CHOICES = [
        ('article', 'Article'),
        ('achievement', 'Achievement'),
        ('question', 'Question'),
        ('project', 'Project'),
    ]

    content = models.TextField()

    tag = models.CharField(max_length=20, choices=TAG_CHOICES, null=True, blank=True)
    comments_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author.username}'s post - {self.created_at.strftime('%Y-%m-%d')}"
    

class PostLike(models.Model):
    user = models.ForeignKey(StudentUser, on_delete=models.CASCADE, verbose_name="User")
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE, 
        verbose_name="Post",
        related_name='likes'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")

    class Meta:
        unique_together = ('user', 'post')
        verbose_name = "Post Like"
        verbose_name_plural = "Post Likes"

    def __str__(self):
        return f"{self.user} likes {self.post}"

class Comment(models.Model):
    author = models.ForeignKey(
        StudentUser, 
        on_delete=models.CASCADE,
        related_name='comments',
        verbose_name="Author"
    )
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE, 
        related_name='comments',
        verbose_name="Post"
    )
    content = models.TextField(verbose_name="Content")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    class Meta:
        ordering = ['created_at']
        verbose_name = "Comment"
        verbose_name_plural = "Comments"

    def __str__(self):
        return f"Comment by {self.author} on {self.post}"

class Project(BaseModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='projects/')
    description = models.TextField()
    badge = models.CharField(max_length=255)
    rating = models.FloatField()
    
    def __str__(self):
        return f"{self.name} - {self.created_at.strftime('%Y-%m-%d')}"
