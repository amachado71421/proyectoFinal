"""
URL configuration for backendKoiDo project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    # API app (contiene endpoints /api/auth/login/, /api/auth/register/, /api/auth/refresh/, /api/auth/me/)
    path('api/', include('api.urls')),
    # Añadir endpoints estándar de SimpleJWT opcionales (si quieres usarlos desde frontend directamente)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]