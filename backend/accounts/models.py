from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class StudentUser(AbstractUser):
    class Majors(models.TextChoices):
        COMPUTER_SCIENCE = "Computer Science", "Computer Science"
        COMPUTER_INFO_SYSTEMS = (
            "Computer Information Systems",
            "Computer Information Systems",
        )
        CYBER_SECURITY = "Cyber Security", "Cyber Security"
        ARTIFICIAL_INTELLIGENCE = "Artificial Intelligence", "Artificial Intelligence"
        OTHER = "Other", "Other"

    username = models.CharField(
        max_length=150, unique=True, blank=True, null=True, verbose_name="Username"
    )
    uni_email = models.EmailField(unique=True, verbose_name="University Email")
    first_name = models.CharField(max_length=30, verbose_name="First Name")
    last_name = models.CharField(max_length=30, verbose_name="Last Name")
    phone = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r"^(?:\+966|0)5[0-9]{8}$",
                message="Phone number must be in the format: +9665XXXXXXXX or 05XXXXXXXX.",
            )
        ],
        verbose_name="Phone Number",
    )
    year_in_college = models.PositiveIntegerField(verbose_name="Year in College")
    major = models.CharField(
        max_length=50, choices=Majors.choices, verbose_name="Major"
    )
    skills = models.JSONField(
        default=list, blank=True, verbose_name="Skills"
    )
    interests = models.JSONField(
        default=list, blank=True, verbose_name="Interests"
    )

    is_email_verified = models.BooleanField(
        default=False, verbose_name="Email Verified"
    )
    otp = models.CharField(max_length=6, blank=True, null=True, verbose_name="OTP")

    USERNAME_FIELD = "uni_email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "phone",
        "year_in_college",
        "major",
    ]

    def __str__(self):
        return self.uni_email

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.uni_email.split("@")[0]
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Student User"
        verbose_name_plural = "Student Users"