from django.urls import path, include

from .views import IsUserAuthenticated

app_name = 'auth'
urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path(
        'registration/', include('dj_rest_auth.registration.urls')
    ),
    path('is_authenticated', IsUserAuthenticated.as_view(), name='is_auth')
]
