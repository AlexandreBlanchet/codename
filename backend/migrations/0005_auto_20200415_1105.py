# Generated by Django 3.0.5 on 2020-04-15 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20200414_1906'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cell',
            name='word',
            field=models.CharField(max_length=50),
        ),
    ]