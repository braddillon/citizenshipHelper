from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import url, include

from . import views 

urlpatterns = [
    url(r'^api/questions$', views.QuestionList.as_view()),
    url(r'^api/sections$', views.SectionList.as_view()),
    url(r'^api/proposedQuestions$', views.ProposedQuestionList.as_view()),
    url(r'^api/createMultipleChoiceQuestion$', views.createMultipleChoiceQuestion),
    url(r'^api/createTrueFalseQuestion$', views.createTrueFalseQuestion),
    url(r'^api/buildTest$', views.buildTest),
    url(r'^api/submitTest$', views.submitTest),
    url(r'^api/testLogSummary$', views.TestLogList.as_view()),
    url(r'^api/testLogGranular$', views.testLogGranular),
    url(r'^api/user$', views.current_user),
    url(r'^api/getProblemQuestions$', views.get_problem_questions),
]
