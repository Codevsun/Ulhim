from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated  # <-- Add this
from .models import StudentUser
from .serializers import StudentUserSerializer
from .utils import generate_otp
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


class RegisterView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        serializer = StudentUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp = generate_otp()
            user.otp = otp
            user.save()
            send_mail(
                "Verify Your Email",
                f"Your OTP is: {otp}",
                settings.EMAIL_HOST_USER,
                [user.uni_email],
                fail_silently=False,
            )
            return Response(
                {"message": "OTP sent to your email."}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        email = request.data.get("uni_email")
        otp = request.data.get("otp")
        try:
            user = StudentUser.objects.get(uni_email=email, otp=otp)
            user.is_email_verified = True
            user.otp = None  # Clear the OTP after verification
            user.save()
            return Response(
                {"message": "Email verified successfully."},
                status=status.HTTP_200_OK,
            )
        except StudentUser.DoesNotExist:
            return Response(
                {"error": "Invalid OTP or email."}, status=status.HTTP_400_BAD_REQUEST
            )


def set_cookie(response, key, value, expires_in):
    response.set_cookie(
        key=key,
        value=value,
        max_age=expires_in,
        httponly=True,
        secure=True,  # Ensure cookies are only sent over HTTPS
        samesite="Strict",  # Prevent CSRF attacks
    )


class TokenView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = []  # Allow unauthenticated access

    def post(self, request):
        uni_email = request.data.get("uni_email")
        password = request.data.get("password")

        # Validate required fields
        if not uni_email or not password:
            return Response(
                {"error": "Both email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Get user by university email
            user = StudentUser.objects.get(uni_email=uni_email)

            # Check password and email verification
            if user.check_password(password):
                if not user.is_email_verified:
                    return Response(
                        {"error": "Email not verified. Please check your inbox."},
                        status=status.HTTP_401_UNAUTHORIZED,
                    )

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Invalid credentials."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except StudentUser.DoesNotExist:
            return Response(
                {"error": "No account found with this email."},
                status=status.HTTP_404_NOT_FOUND,
            )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {
                "uni_email": user.uni_email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "skills": user.skills,
                "interests": user.interests,
            }
        )


class RefreshTokenView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can log out

    def post(self, request):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Successfully logged out."}, status=status.HTTP_200_OK
            )
        except TokenError as e:
            return Response(
                {"error": "Invalid or expired token."},
                status=status.HTTP_400_BAD_REQUEST,
            )
