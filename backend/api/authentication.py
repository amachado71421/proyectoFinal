from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    """
    Autenticación personalizada que permite validar JWT desde:
    1. Header Authorization: Bearer <token>
    2. Cookie HttpOnly: access_token
    """

    def authenticate(self, request):
        # 1. Intentar obtener el token desde el header Authorization
        header = self.get_header(request)
        if header is not None:
            raw_token = self.get_raw_token(header)
        else:
            # 2. Si no hay header, buscar el token en la cookie HttpOnly
            raw_token = request.COOKIES.get('access_token')

        # Si no se encontró token en ninguno de los dos lugares
        if raw_token is None:
            return None

        # Validar el token
        try:
            validated_token = self.get_validated_token(raw_token)
        except Exception:
            # Si el token no es válido, no autenticar
            return None

        # Retornar el usuario autenticado y el token validado
        return self.get_user(validated_token), validated_token
