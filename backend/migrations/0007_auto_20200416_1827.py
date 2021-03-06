# Generated by Django 3.0.5 on 2020-04-16 16:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_auto_20200415_1148'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cell',
            name='game',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cells', to='backend.Game'),
        ),
        migrations.AlterField(
            model_name='player',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='players', to='backend.Team'),
        ),
        migrations.AlterField(
            model_name='team',
            name='leader',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='leader_team', to='backend.Player'),
        ),
    ]
