from rest_framework import serializers

from quiz.models import Quiz, Question, Option


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('label', )


class QuestionSerializer(serializers.ModelSerializer):
    option_set = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('id', 'question_text', 'option_set')


class QuizSerializer(serializers.ModelSerializer):
    question_set = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ('name', 'question_set')
