from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CookieJWTAuthentication(JWTAuthentication):
    def get_raw_token(self, header):
        return None

    def get_token_from_cookie(self, request):
        return request.COOKIES.get(settings.SIMPLE_JWT.get('AUTH_COOKIE'))

    def authenticate(self, request):
        raw_token = self.get_token_from_cookie(request)
        if raw_token is None:
            return None
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
