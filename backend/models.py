from django.db import models
from django.contrib.auth.models import User




class Word(models.Model):
    """ This is the list of words that will be available for the game """
    word = models.CharField(max_length=50)


class Cell(models.Model):
    """ This will be the cell list for a specific game, each cell will have coordinate and a specific word 
        The type parameter is here to know if the cell is for a team or another team or neutral 
        the parameter found allow us to know is the cell has been found by the players and should be hidden """

    x = models.IntegerField()
    y = models.IntegerField()
    word = models.models.ForeignKey('Word', on_delete=models.CASCADE)
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    type = models.CharField(default='N', max_length=1)
    found = models.models.BooleanField(default=False)


class Game(models.Model):
    """ describe any game and its parameters """
    status = models.CharField(default='P', max_length=1)


class Team(models.Model):
    """ represent a team in the game. there either one or two teams """
    game = models.models.ForeignKey('Game', on_delete=models.CASCADE)


class Player(models.Model):
    """ describe players attributes such as its team """
    user = models.models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.models.ForeignKey('Team', on_delete=models.CASCADE)

