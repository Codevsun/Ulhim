from rest_framework import serializers
from .models import StudentUser


class StudentUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    skills = serializers.ListField(
        child=serializers.CharField(), required=False, default=list
    )
    interests = serializers.ListField(
        child=serializers.CharField(), required=False, default=list
    )

    class Meta:
        model = StudentUser
        fields = [
            "uni_email",
            "first_name",
            "last_name",
            "phone",
            "year_in_college",
            "major",
            "skills",
            "interests",
            "password",
            "username",
            "profile_image",
        ]

    def validate_uni_email(self, value):
        if not value.endswith("@iau.edu.sa"):
            raise serializers.ValidationError("Only university emails are allowed.")
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = StudentUser.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
