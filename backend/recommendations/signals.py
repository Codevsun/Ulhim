from django.db.models.signals import post_save
from django.dispatch import receiver
from .services import recommendation_engine
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=User)
def update_recommendations(sender, instance, **kwargs):
    """Refresh only if relevant fields change"""
    if kwargs.get('update_fields') and {'skills', 'interests'}.intersection(kwargs['update_fields']):
        recommendation_engine.refresh_data()
    elif not kwargs.get('created'):
        recommendation_engine.update_user_data(instance.id)