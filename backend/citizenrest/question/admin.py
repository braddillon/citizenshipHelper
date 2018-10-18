from django.contrib import admin
from .models import Question, Section, Answer, Result, ProposedQuestion, LogTest, LogTestQuestion

# Register your models here.
admin.site.register(Question)
admin.site.register(Section)
admin.site.register(Answer)
admin.site.register(ProposedQuestion)
admin.site.register(LogTest)
admin.site.register(LogTestQuestion)

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'question', 'testing_date', 'correct')
    list_filter = ('user', 'testing_date', 'correct')
