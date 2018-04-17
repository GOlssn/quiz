from __future__ import unicode_literals

from django.db import models


class Quiz(models.Model):
    name = models.CharField(max_length=64)


class Question(models.Model):
    question_text = models.CharField(max_length=256)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)


class Option(models.Model):
    label = models.CharField(max_length=64)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
