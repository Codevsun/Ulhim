from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import StudentUser
from .serializers import StudentUserSerializer
from .utils import generate_otp_send_email, expire_otp, is_otp_expired
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.exceptions import TokenError
from recommendations.services import RecommendationEngine
import os


recommendation_engine = RecommendationEngine()

class RegisterView(APIView):
    authentication_classes = []  # Explicitly disable authentication
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        try:
            # Get the temporary user
            temp_user = StudentUser.objects.get(
                uni_email=request.data.get('uni_email'),
                is_active=False
            )
            
            # Hash the password before passing to serializer
            data = request.data.copy()
            if 'password' in data:
                temp_user.set_password(data['password'])
                temp_user.save()
                data.pop('password')  # Remove password from data since it's already set
            
            # Update the serializer data with the existing user instance
            serializer = StudentUserSerializer(
                temp_user,
                data=data,
                partial=True
            )
            
            if serializer.is_valid():
                user = serializer.save(
                    is_active=True,
                    is_email_verified=True
                )
                return Response(
                    {"message": "Registration successful."},
                    status=status.HTTP_201_CREATED
                )
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except StudentUser.DoesNotExist:
            return Response(
                {"error": "Please verify your email first."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(f"Registration error: {e}")
            return Response(
                {"error": "An error occurred during registration."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TestView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def get(self, request):
        return Response({"message": "Hello, world!"}, status=status.HTTP_200_OK)


class VerifyEmailView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("uni_email")
        otp = request.data.get("otp")
        try:
            user = StudentUser.objects.get(uni_email=email)
            
            # For password reset, allow already verified users
            if user.is_email_verified:
                if user.otp == otp:
                    if is_otp_expired(user):
                        expire_otp(user)
                        return Response(
                            {"error": "OTP expired. Please request a new OTP."},
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                    user.otp = None
                    user.otp_expiration = None
                    user.save()
                    return Response(
                        {"message": "OTP verified successfully."},
                        status=status.HTTP_200_OK,
                    )
                return Response(
                    {"error": "Invalid OTP."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # For new user registration
            if user.otp != otp:
                return Response(
                    {"error": "Invalid OTP."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if is_otp_expired(user):
                expire_otp(user)
                return Response(
                    {"error": "OTP expired. Please request a new OTP."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            
            # If this is a temporary user (not active), don't mark as verified yet
            if user.is_active:
                user.is_email_verified = True
                user.otp = None
                user.otp_expiration = None
                user.save()
            
            return Response(
                {"message": "OTP verified successfully."},
                status=status.HTTP_200_OK,
            )
        except StudentUser.DoesNotExist:
            return Response(
                {"error": "Invalid OTP or email."}, 
                status=status.HTTP_400_BAD_REQUEST
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
    authentication_classes = []  
    permission_classes = [AllowAny]  
    
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
                {"error": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,  
                "uni_email": user.uni_email,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "skills": user.skills,
                "year_in_college": user.year_in_college,
                "interests": user.interests,
                "major": user.major,
                "profile_image": user.profile_image.url if user.profile_image else None,
                "stats": {
                    "followers_count": 0,
                    "following_count": 0,
                    "posts_count": 2
                }

            }
        )


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Validate and create new refresh token
            refresh = RefreshToken(refresh_token)
            
            # Always rotate tokens for security
            refresh.blacklist()
            
            # Get user and create new tokens
            user_id = refresh.payload.get('user_id')
            user = StudentUser.objects.get(uni_email=user_id)
            new_refresh = RefreshToken.for_user(user)
            
            return Response({
                "access": str(new_refresh.access_token),
                "refresh": str(new_refresh)
            })

        except (TokenError, StudentUser.DoesNotExist) as e:
            return Response(
                {"error": "Invalid or expired refresh token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class RequestOTPView(APIView):
    authentication_classes = []  # Explicitly disable authentication
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        uni_email = request.data.get("uni_email")
        if not uni_email:
            return Response(
                {"error": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Try to get existing user
            user = StudentUser.objects.get(uni_email=uni_email)
            if not user.is_email_verified:
                # Existing unverified user - send new OTP
                generate_otp_send_email(user)
                return Response(
                    {"message": "OTP sent to your email."},
                    status=status.HTTP_200_OK,
                )
            else:
                # User exists and is verified
                return Response(
                    {"error": "Email already registered and verified."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except StudentUser.DoesNotExist:
            try:
                # Create new temporary user with default values
                temp_user = StudentUser.objects.create(
                    uni_email=uni_email,
                    is_active=False,  # Keep inactive until email is verified
                    is_email_verified=False,
                    username=uni_email.split('@')[0],  # Temporary username
                    first_name='Temporary',
                    last_name='User',
                    year_in_college=1,  # Default value, will be updated during registration
                    major='Undecided',  # Default value, will be updated during registration
                    password='!',  # Unusable password
                )
                generate_otp_send_email(temp_user)
                return Response(
                    {"message": "OTP sent to your email."},
                    status=status.HTTP_200_OK,
                )
            except Exception as e:
                print(f"Error creating temporary user: {e}")
                return Response(
                    {"error": "An error occurred while sending the OTP."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )


class ResetPasswordView(APIView):
    authentication_classes = [] 
    permission_classes = [AllowAny]

    def post(self, request):
        uni_email = request.data.get("uni_email")
        new_password = request.data.get("new_password")
        if not uni_email or not new_password:
            return Response(
                {"error": "Both email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        try:
            user = StudentUser.objects.get(uni_email=uni_email)
            if not user.is_email_verified:
                return Response(
                    {"error": "Email not verified. Please check your inbox."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            user.set_password(new_password)
            user.save()
            return Response(
                {"message": "Password reset successfully."},
                status=status.HTTP_200_OK,
            )
        except StudentUser.DoesNotExist:
            return Response(
                {"error": "Invalid OTP or email."}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": "An error occurred while resetting the password."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )



class RequestPasswordResetOTPView(APIView):
    authentication_classes = []  # Explicitly disable authentication
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        uni_email = request.data.get("uni_email")
        if not uni_email:
            return Response(
                {"error": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = StudentUser.objects.get(uni_email=uni_email)
            if not user.is_active:
                return Response(
                    {"error": "Account not activated. Please complete registration first."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            generate_otp_send_email(user)
            return Response(
                {"message": "Password reset OTP sent to your email."},
                status=status.HTTP_200_OK
            )

        except StudentUser.DoesNotExist:
            return Response(
                {"error": "No account found with this email."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            print(f"Error sending password reset OTP: {e}")
            return Response(
                {"error": "An error occurred while sending the OTP."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



class VerifyPasswordResetOTPView(APIView):
    authentication_classes = [] 
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("uni_email")
        otp = request.data.get("otp")
        
        try:
            user = StudentUser.objects.get(uni_email=email)
            
            if user.otp != otp:
                return Response(
                    {"error": "Invalid OTP."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if is_otp_expired(user):
                expire_otp(user)
                return Response(
                    {"error": "OTP expired. Please request a new OTP."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            
            # Clear OTP after successful verification
            user.otp = None
            user.otp_expiration = None
            user.save()
            
            return Response(
                {"message": "OTP verified successfully."},
                status=status.HTTP_200_OK,
            )
            
        except StudentUser.DoesNotExist:
            return Response(
                {"error": "Invalid email."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendations(request):
    user = request.user
    recommended_users = recommendation_engine.get_similar_users(user.id)
    
    # Serialize recommended users
    recommended_data = []
    for recommended_user in recommended_users:
        recommended_data.append({
            'id': recommended_user.id,
            'first_name': recommended_user.first_name,
            'last_name': recommended_user.last_name,
            'major': recommended_user.major,
            'skills': recommended_user.skills,
            'interests': recommended_user.interests,
            'profile_image': recommended_user.profile_image.url if recommended_user.profile_image else None
        })
    
    return Response({
        'recommendations': recommended_data
    }, status=status.HTTP_200_OK)

class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        image = request.FILES.get('profile_image')
        
        if not image:
            return Response(
                {"error": "No profile image provided."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Optional: validate file type and size
        if not image.content_type.startswith('image/'):
            return Response(
                {"error": "File must be an image."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if image.size > 5 * 1024 * 1024:  # 5MB limit
            return Response(
                {"error": "Image size should not exceed 5MB."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Delete old image if it exists
        if user.profile_image:
            if os.path.isfile(user.profile_image.path):
                os.remove(user.profile_image.path)
        
        # Save new image
        user.profile_image = image
        user.save()
        
        return Response(
            {
                "message": "Profile image updated successfully.",
                "image_url": user.profile_image.url
            },
            status=status.HTTP_200_OK
        )
    

class SearchUsersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        from django.db.models import Q
        
        query = request.query_params.get('query')
        if not query:
            return Response(
                {"error": "Query parameter is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Search for users by username, first name, last name, or major
        users = StudentUser.objects.filter(
            Q(username__icontains=query) |
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(major__icontains=query)
        )[:10]  # Limit to 10 results for performance
        
        # Format the response data
        results = []
        for user in users:
            results.append({
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'major': user.major,
                'profile_image': user.profile_image.url if user.profile_image else None,
                'year_in_college': user.year_in_college
            })
        
        return Response(results)