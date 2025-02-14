import random
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


def generate_otp():
    """
    Generate a 4-digit OTP.
    """
    return str(random.randint(1000, 9999))


def generate_otp_send_email(user):
    otp = generate_otp()
    user.otp = otp
    user.otp_expiration = timezone.now() + timedelta(minutes=1)
    user.save()
    send_mail(
        "Verify Your Email",
        f"Your OTP is: {otp}",
        settings.EMAIL_HOST_USER,
        [user.uni_email],
        fail_silently=False,
    )

def expire_otp(user):
    user.otp = None
    user.otp_expiration = None
    user.save()

def is_otp_expired(user):
    return user.otp_expiration < timezone.now()