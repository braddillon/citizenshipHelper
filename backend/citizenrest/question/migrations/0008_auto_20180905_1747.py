# Generated by Django 2.1.1 on 2018-09-05 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0007_proposedquestion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proposedquestion',
            name='fakeAnswer2',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='proposedquestion',
            name='fakeAnswer3',
            field=models.TextField(null=True),
        ),
    ]
