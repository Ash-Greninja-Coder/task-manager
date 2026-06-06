from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, signup, login_view, logout_view

router = DefaultRouter()
router.register("tasks", TaskViewSet, basename="tasks")

urlpatterns = [
    path("", include(router.urls)),
    path("signup/", signup),
    path("login/", login_view),
    path("logout/", logout_view),
]