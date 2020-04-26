from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from . import views


urlpatterns = [
    # path('login/', LoginView.as_view(template_name='accounts/dynamic.html'), name='login'),
    path('main/', views.main_view, name='main'),
    path('login/auth/', views.login_view),
    # path('logout/', LogoutView.as_view(template_name='accounts/logged_out.html'), name='logout'),
    path('logout/', views.logout_view),
    path('registration/', views.registration_page),
    path('registration/submit/', views.registration_view),
]
