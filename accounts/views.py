from django.shortcuts import render, redirect
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse



# Create your views here.

def main_view(request):
    """
    Renders start page
    """
    return render(request, 'accounts/login.html')


def registration_page(request):
    """
    Renders registration page
    """
    return render(request, 'accounts/registration.html')


def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    # email = request.POST['email']
    user = auth.authenticate(username=username, password=password)
    if user is not None and user.is_active:
        # Правильный пароль и пользователь "активен"
        auth.login(request, user)
        # Перенаправление на "правильную" страницу
        return JsonResponse({'success': True, 'msg': 'Consignment updated'})
    else:
        # Отображение страницы с ошибкой
        return JsonResponse({'success': False, 'msg': 'error'})


@login_required
def logout_view(request):
    """
    Site logout function
    """
    auth.logout(request)
    return redirect('/')


# def registration_view(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             print(username)
#             password = form.cleaned_data.get('password')
#             print(password)
#             user = auth.authenticate(username=username, password=password)
#             auth.login(request, user)
#             return redirect('/test')
#     else:
#         form = UserCreationForm()
#     return render(request, 'accounts/registration.html', {'form': form})

def registration_view(request):
    """
    Site registration function
    """
    username = request.POST['username']
    password = request.POST['password']
    confirm = request.POST['confirm']

    if User.objects.filter(username=username).count():
        return JsonResponse({'success': False, 'msg': 'error'})
    if username == "":
        return JsonResponse({'success': False, 'error': 'error'})
    if password == "":
        return JsonResponse({'success': False, 'error': 'error'})
    if password != confirm:
        return JsonResponse({'success': False, 'error': 'error'})

    user = User.objects.create_user(username=username)
    user.set_password(password)
    user.save()
    # user.backend = "django.contrib.auth.backends.ModelBackend"
    auth.login(request, user)
    return JsonResponse({'success': True})
