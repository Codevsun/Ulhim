from django.urls import path
from .views import (
    RegisterView,
    VerifyEmailView,
    TokenView,
    ProfileView,
    RefreshTokenView,
    ResetPasswordView,
    RequestOTPView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("verify-email/", VerifyEmailView.as_view(), name="verify-email"),
    path("token", TokenView.as_view(), name="token"),
    path("refresh-token", RefreshTokenView.as_view(), name="refresh-token"),
    path("profile", ProfileView.as_view(), name="profile"),
    path("request-otp", RequestOTPView.as_view(), name="request-otp"),
    path("reset-password", ResetPasswordView.as_view(), name="reset-password"),
]
