from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from api.app import views
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

schema_view = get_swagger_view(title='Premier League Player Index')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^obtain-auth-token/$', obtain_auth_token),
    url(r'^app/', TemplateView.as_view(template_name='index.html')),
    url(r'^schema/', schema_view)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
