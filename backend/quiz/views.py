from rest_framework import viewsets, mixins

from quiz.models import Quiz
from quiz.serializers import QuizSerializer


class QuizViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
