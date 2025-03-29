from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Post

@receiver(post_save, sender=Post)
def update_trending_status(sender, instance, **kwargs):
    """
    Mark post as trending if it gets enough engagement
    """
    if instance.like_count > 50 or instance.comment_count > 20:
        instance.is_trending = True
        instance.save(update_fields=['is_trending'])