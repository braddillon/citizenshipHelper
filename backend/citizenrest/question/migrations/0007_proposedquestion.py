# Generated by Django 2.1.1 on 2018-09-05 17:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('question', '0006_result_answer'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProposedQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('multiChoice', models.BooleanField()),
                ('correctAnswer', models.TextField()),
                ('fakeAnswer1', models.TextField()),
                ('fakeAnswer2', models.TextField()),
                ('fakeAnswer3', models.TextField()),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question.Section')),
                ('submitter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proposedQuestion', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]