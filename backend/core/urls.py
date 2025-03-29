from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from posts.urls import urlpatterns as posts_urls
from accounts.views import TestView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("accounts.urls")),
    path("api/v1/test/", TestView.as_view(), name="test"),
    path("api/v1/posts/", include(posts_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
