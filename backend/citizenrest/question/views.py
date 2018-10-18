from django.shortcuts import render

from django.http import HttpResponse
from rest_framework import serializers, viewsets
from rest_framework import generics
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
import time
from django.db.models import Count
import datetime
import pandas as pd
from django.contrib.auth.models import User
import random

from .models import Question, Section, Answer, Result, ProposedQuestion, LogTest, LogTestQuestion
from .serializers import QuestionSerializer, QuestionSerializer2, AnswerSerializer, SectionSerializer, ResultSerializer, UserSerializer, ProposedQuestionSerializer
from .serializers import ProposedQuestionCreateSerializer, LogTestSerializer

from .utils import identify_problem_questions

# Create your views here.
class QuestionList(generics.ListAPIView):
    serializer_class = QuestionSerializer
    authentication_classes = (JSONWebTokenAuthentication,SessionAuthentication, BasicAuthentication)

    def get_queryset(self):
        return Question.objects.all()

class SectionList(generics.ListAPIView):
    serializer_class = SectionSerializer
    authentication_classes = (JSONWebTokenAuthentication,SessionAuthentication, BasicAuthentication)

    def get_queryset(self):
        return Section.objects.all()

@api_view(['POST'])
def createMultipleChoiceQuestion(request):
    if request.method == 'POST':
        if not request.user.is_staff:
            print("not staff.... dumping into proposal bucket")
            serializer = ProposedQuestionCreateSerializer(data={
                'question': request.data['question'],
                'correctAnswer': request.data['correctAnswer'],
                'fakeAnswer1': request.data['fakeAnswer1'],
                'fakeAnswer2': request.data['fakeAnswer2'],
                'fakeAnswer3': request.data['fakeAnswer3'],
                'submitter': request.user.id,
                'section': request.data['section'],
                'multiChoice': True,
            })
            if serializer.is_valid():
                proposed = serializer.save()
                return Response('Submitted', status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                return Response('Invalid', status=status.HTTP_400_BAD_REQUEST)



        if request.data['submitter'] == '':
            user = request.user.pk
        else:
            user = User.objects.get(username=request.data['submitter']).pk

        serializer = QuestionSerializer2(data={'question': request.data['question'], 'section': request.data['section'], 'user': user})
        if serializer.is_valid():
            question = serializer.save()
            print(question.id)

            ansSerializer = AnswerSerializer(data={'answer': request.data['correctAnswer'], 'correct': True, 'question': question.id})
            if ansSerializer.is_valid():
                answer = ansSerializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            ansSerializer = AnswerSerializer(data={'answer': request.data['fakeAnswer1'], 'correct': False, 'question': question.id})
            if ansSerializer.is_valid():
                answer = ansSerializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            ansSerializer = AnswerSerializer(data={'answer': request.data['fakeAnswer2'], 'correct': False, 'question': question.id})
            if ansSerializer.is_valid():
                answer = ansSerializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            ansSerializer = AnswerSerializer(data={'answer': request.data['fakeAnswer3'], 'correct': False, 'question': question.id})
            if ansSerializer.is_valid():
                answer = ansSerializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            print(request.data)
            if request.data['proposedQuestionId'] != '':
                print('deleting', request.data['proposedQuestionId'])
                ProposedQuestion.objects.filter(id=int(request.data['proposedQuestionId'])).delete()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def createTrueFalseQuestion(request):
    if request.method == 'POST':
        if request.data['answer'] == 'True':
            opposite = 'False'
        else:
            opposite = 'True'


        if not request.user.is_staff:
            print("not staff.... dumping into proposal bucket")
            serializer = ProposedQuestionCreateSerializer(data={
                'question': request.data['question'],
                'correctAnswer': request.data['answer'],
                'fakeAnswer1': opposite,
                'fakeAnswer2': None,
                'fakeAnswer3': None,
                'submitter_id': request.user.id,
                'section': request.data['section'],
                'multiChoice': False,
            })
            
            if serializer.is_valid():
                proposed = serializer.save()
                return Response('Submitted', status=status.HTTP_201_CREATED)
            else:
                return Response('Invalid', status=status.HTTP_400_BAD_REQUEST)

        if request.data['submitter'] == '':
            user = request.user.pk
        else:
            user = User.objects.get(username=request.data['submitter']).pk

        print("user", user)
        serializer = QuestionSerializer2(data={'question': request.data['question'], 'section': request.data['section'], 'user': user})
        if serializer.is_valid():
            question = serializer.save()
            print(question.id)

            ansSerializer = AnswerSerializer(data={'answer': request.data['answer'], 'correct': True, 'question': question.id})
            if ansSerializer.is_valid():
                answer = ansSerializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            ansSerializer = AnswerSerializer(data={'answer': opposite, 'correct': False, 'question': question.id})
            if ansSerializer.is_valid():
                answer = ansSerializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            print(request.data)
            if request.data['proposedQuestionId'] != '':
                print('deleting', request.data['proposedQuestionId'])
                ProposedQuestion.objects.filter(id=int(request.data['proposedQuestionId'])).delete()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def buildTest(request):
    filters = list(map(int, request.data['filters']))

    ids = []
    if not filters:
        ids = Question.objects.all().values_list('id', flat=True)[::1]
    else:
        ids = Question.objects.filter( section__in=filters ).values_list('id', flat=True)[::1]

    if request.data['questions'] > len(ids):
        picked_questions = ids
    else:
        picked_questions = random.sample(ids, request.data['questions'])

    queryset = Question.objects.filter(pk__in=picked_questions)

    serializer = QuestionSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def submitTest(request):
    questions = {int(k):int(v) for k,v in request.data['questions'].items()}
    duration = request.data['duration']

    testDate = timezone.now()
    total = 0
    correct = 0

    grade = {}

    # Grade the test
    for k,v in questions.items():
        tmp = Answer.objects.filter(question__id=k).filter(correct=True)
        if tmp and tmp[0].id == v:
            grade[tmp[0].question] = (tmp[0], True)
            correct = correct+1
        else:
            incorrectAnswer = Answer.objects.get(id=v)
            grade[tmp[0].question] = (incorrectAnswer, False)
        total = total + 1

    # Save the tests
    test = LogTest(user=request.user, testing_date=testDate, duration=duration, correctAnswers=correct, totalQuestions=total)
    test.save()

    for k,v in grade.items():
        testQuestion = LogTestQuestion(logTest = test, question=v[0].question, answer=v[0], correct=v[1])
        testQuestion.save()

    return Response('', status=status.HTTP_200_OK)

class TestLogList(generics.ListAPIView):
    serializer_class = LogTestSerializer
    
    def get_queryset(self):
        return LogTest.objects.filter(user=self.request.user)

# @api_view(['GET'])
# def testLogSummary(request):
#     #qry = Result.objects.filter(user=request.user).values('testing_date', 'correct')
#     qry = TestLog.objects.filter(user=request.user)
#     if not qry:
#         return Response({}, status=status.HTTP_200_OK)
#     else:
#         df = pd.DataFrame(list(qry))
#         #df = pd.DataFrame(list(Result.objects.filter(user=request.user).values('testing_date', 'correct')))
#         df['testDate'] = df['testing_date'].astype('int64')
#         dfSummary = pd.pivot_table(df, values='testing_date', index=['testDate'], columns='correct', aggfunc='count').reset_index()
#         dfSummary.set_index('testDate', inplace=True)
#         if True not in dfSummary.columns:
#             dfSummary[True] = 0
#         if False not in dfSummary.columns:
#             dfSummary[False] = 0
#         dfSummary.fillna(0, inplace=True)
#         dfSummary['total'] = dfSummary[False] + dfSummary[True]

#         dfSummary.rename(columns={False:'incorrect', True:'correct'}, inplace=True)
#         dfSummary.sort_values(by=['testDate'], ascending=False, inplace=True)

#         print(dfSummary.to_dict('index'))

#         return Response(dfSummary.to_dict('index'), status=status.HTTP_200_OK)

@api_view(['POST'])
def testLogGranular(request):
    id = request.data['id']

    if not id:
        return Response('Missing id', status=status.HTTP_400_BAD_REQUEST)
    else:
        queryset = LogTestQuestion.objects.filter(logTest__id=id)

    myResponse = {}
    for x in queryset:
        if (x.correct == True):
            tmpResponse = {'id': x.question.id, 'question': x.question.question, 'answer': x.answer.answer, 'correct': x.correct}
        else: 
            correctAnswer = Answer.objects.filter(question__id=x.question.id).filter(correct=True)
            tmpResponse = {'id': x.question.id, 'question': x.question.question, 'answer': x.answer.answer, 'correctAnswer': correctAnswer[0].answer, 'correct': False}
        myResponse[x.question.id] = tmpResponse

    print(myResponse)
    return Response(myResponse, status=status.HTTP_200_OK)

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class ProposedQuestionList(generics.ListAPIView):
    serializer_class = ProposedQuestionSerializer
    authentication_classes = (JSONWebTokenAuthentication,SessionAuthentication, BasicAuthentication)

    def get_queryset(self):
        return ProposedQuestion.objects.all()

@api_view(['GET'])
def get_problem_questions(request):
    probQuest = identify_problem_questions(request.user)

    question = {x.pk:x for x in Question.objects.filter(pk__in=probQuest)}

    

    resp = []
    for key, value in probQuest.items():
        item = {}
        item['id'] = key
        item['score'] = value
        item['question'] = question[key].question
        item['section'] = question[key].section.id
        resp.append(item)

    print(resp)
    return Response(resp)