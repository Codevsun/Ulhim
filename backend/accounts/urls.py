from django.urls import path, include

from .views import (
    RegisterView,
    VerifyEmailView,
    TokenView,
    ProfileView,
    RefreshTokenView,
    ResetPasswordView,
    RequestOTPView,
    RequestPasswordResetOTPView,
    VerifyPasswordResetOTPView,
    UpdateProfileView,
    get_recommendations,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("verify-email/", VerifyEmailView.as_view(), name="verify-email"),
    path("token/", TokenView.as_view(), name="token"),
    path("refresh-token/", RefreshTokenView.as_view(), name="refresh-token"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("request-otp/", RequestOTPView.as_view(), name="request-otp"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),
    path("request-password-reset/", RequestPasswordResetOTPView.as_view(), name="request-password-reset"),
    path("verify-password-reset-otp/", VerifyPasswordResetOTPView.as_view(), name="verify-password-reset-otp"),
    path("update-profile/", UpdateProfileView.as_view(), name="update-profile"),
    path("recommendations/", get_recommendations, name="recommendations"),
]
