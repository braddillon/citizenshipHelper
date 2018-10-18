from django.db import models
from django.utils import timezone
from datetime import datetime

class Section(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return str(self.name)


# Create your models here.
class ProposedQuestion(models.Model):
    question = models.TextField()
    multiChoice = models.BooleanField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    correctAnswer = models.TextField()
    fakeAnswer1 = models.TextField()
    fakeAnswer2 = models.TextField(null=True)
    fakeAnswer3 = models.TextField(null=True)
    submitter = models.ForeignKey('auth.User', related_name='proposedQuestion', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.question)

# Create your models here.
class Question(models.Model):
    question = models.TextField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('auth.User', related_name='question_user', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.question)


# Create your models here.
class Answer(models.Model):
    answer = models.TextField()
    correct = models.BooleanField()
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.answer)

# Create your models here.
class Result(models.Model):
    user = models.ForeignKey('auth.User', related_name='result', on_delete=models.CASCADE)
    testing_date = models.DateTimeField(default=timezone.now)
    question = models.ForeignKey(Question, related_name='resultQuestion', on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, related_name='resultAnswer', on_delete=models.CASCADE)
    correct = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.question)


class LogTest(models.Model):
    user = models.ForeignKey('auth.User', related_name='logTestUser', on_delete=models.CASCADE)
    testing_date = models.DateTimeField(default=timezone.now)
    duration = models.IntegerField()
    correctAnswers = models.IntegerField()
    totalQuestions = models.IntegerField()

    def __str__(self):
        return str(self.user) + ' -- ' + str(self.testing_date)

class LogTestQuestion(models.Model):
    logTest = models.ForeignKey(LogTest, related_name='logTest', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, related_name='logTestQuestion', on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, related_name='logTestAnswer', on_delete=models.CASCADE)
    correct = models.BooleanField(default=False)

    def __str__(self):
        return str(self.question)

