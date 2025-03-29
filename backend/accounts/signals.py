from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.core.cache import cache
from recommendations.services import RecommendationEngine

User = get_user_model()

def update_recommendations(user_id):
    recommendation_engine = RecommendationEngine()
    recommendation_engine.update_user_data(user_id)

@receiver(post_save, sender=User)
def queue_recommendation_update(sender, instance, **kwargs):
    """
    Queue the recommendation update 
    instead of performing it immediately
    """
    
    # Use a task queue if available
    try:
        from django.contrib.auth import get_user_model
        from asgiref.sync import async_to_sync
        from channels.layers import get_channel_layer

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.send)('recommendation-updates', {
            'type': 'update_recommendations',
            'user_id': instance.id
        })
    except ImportError:
        # Fallback to cache-based queuing if no task queue
        cache_key = f'recommendation_update_{instance.id}'
        cache.set(cache_key, instance.id, timeout=300)  # 5 minutes