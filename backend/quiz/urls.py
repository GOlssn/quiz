from rest_framework.routers import DefaultRouter

from quiz.views import QuizViewSet

app_name = 'api'

router = DefaultRouter()
router.register(r'quiz', QuizViewSet, base_name='quiz')

urlpatterns = router.urls
