# Generated by Django 2.1.1 on 2018-09-04 00:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0005_result'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='answer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='resultAnswer', to='question.Answer'),
            preserve_default=False,
        ),
    ]
