import random


def generate_otp():
    """
    Generate a 5-digit OTP.
    """
    return str(random.randint(10000, 99999))
