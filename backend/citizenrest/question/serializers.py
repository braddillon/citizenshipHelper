from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User

from .models import Question, Answer, Section, Result, ProposedQuestion, LogTest, LogTestQuestion

# Serializers define the API representation.
class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('id', 'name')

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'answer',  'correct', 'question')

# Serializers define the API representation.
class QuestionSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'question',  'section', 'user')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        #fields = '__all__'
        fields = ('id', 'username', 'is_superuser', 'is_staff')


# Serializers define the API representation.
class ProposedQuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposedQuestion
        fields = ('question', 'multiChoice', 'section', 'correctAnswer', 'fakeAnswer1', 'fakeAnswer2', 'fakeAnswer3', 'submitter')

class ProposedQuestionSerializer(ProposedQuestionCreateSerializer):
    submitter = serializers.StringRelatedField()
    class Meta:
        model = ProposedQuestion
        fields = ('id', 'question', 'multiChoice', 'section', 'correctAnswer', 'fakeAnswer1', 'fakeAnswer2', 'fakeAnswer3', 'submitter')


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ('id', 'question',  'section', 'created_at', 'answers')

class ResultSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(read_only=True)
    class Meta:
        model = Result
        fields = ('question', 'correct')

class LogTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogTest
        fields = ('id', 'testing_date', 'duration', 'correctAnswers', 'totalQuestions')
