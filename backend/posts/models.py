from django.db import models
from accounts.models import StudentUser
import uuid
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator, MinValueValidator, MaxValueValidator

class BaseModel(models.Model):
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
        related_name='%(class)ss'  # Dynamic related_name
    )
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    major = models.CharField(max_length=20, choices=MAJOR_CHOICES, default='cs')
    
    class Meta:
        abstract = True
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.author.username}-{uuid.uuid4().hex[:8]}")
        super().save(*args, **kwargs)

class Post(BaseModel):
    TAG_CHOICES = [
        ('article', 'Article'),
        ('achievement', 'Achievement'),
        ('certificate', 'Certificate'),
        ('inspiration', 'Inspiration'),
        ('collaboration', 'Collaboration'),
        ('idea', 'Idea'),
    ]

    content = models.TextField(max_length=255)
    tag = models.CharField(max_length=20, choices=TAG_CHOICES)
    image = models.ImageField(
        upload_to='posts/%Y/%m/%d/',
        null=True,
        blank=True,
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])]
    )
    level = models.PositiveIntegerField(default=1,     validators=[MinValueValidator(1), MaxValueValidator(5)]
)
    inspired_count = models.PositiveIntegerField(default=0)
    is_trending = models.BooleanField(default=False)
    
    @property
    def like_count(self):
        return self.likes.count()
    
    @property
    def comment_count(self):
        return self.comments.count()

    def clean(self):
        if len(self.content) > 255:
            raise ValidationError("Post content cannot exceed 255 characters")

class Project(BaseModel):
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    tags = models.CharField(max_length=255, blank=True)
    image = models.ImageField(
        upload_to='projects/%Y/%m/%d/',
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])]
    )
    collaborators = models.ManyToManyField(
        StudentUser,
        related_name='collaborated_projects',
        blank=True
    )
    level = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(5)])

    def clean(self):
        if len(self.description) > 255:
            raise ValidationError("Description cannot exceed 255 characters")

class Like(models.Model):
    user = models.ForeignKey(StudentUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

class Comment(models.Model):
    author = models.ForeignKey(StudentUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']