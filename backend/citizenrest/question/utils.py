import pandas as pd
from django.contrib.auth.models import User
from django.db.models import Count

from .models import LogTest, LogTestQuestion

def identify_problem_questions(user):
    qs_correct = LogTestQuestion.objects.filter(logTest__user=user).filter(correct=True).values_list('question__id').annotate(Count('correct'))
    qs_total = LogTestQuestion.objects.filter(logTest__user=user).values_list('question__id').annotate(Count('correct'))
    if (qs_total.count() == 0):
        return {}
    df = pd.DataFrame(list(qs_total))
    df.columns = ['id', 'total']
    df.set_index('id', inplace=True)

    dfCor = pd.DataFrame(list(qs_correct))
    dfCor.columns = ['id', 'correct']
    dfCor.set_index('id', inplace=True)

    df = pd.merge(df, dfCor, left_index=True, right_index=True)
    df['score'] = df['correct'] - (df['total']-df['correct'])
    df2 = df[df['score']<=-1].copy(True)
    df2.sort_values(by=['score'], inplace=True)
    
    return df2['score'].to_dict()

    # serializer = UserSerializer(request.user)
    # return Response(serializer.data)