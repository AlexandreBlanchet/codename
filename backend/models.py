from django.db import models
from django.contrib.auth.models import User


TEAM_COLORS = (
    ('R', 'Red'),
    ('B', 'Blue'),
)

class Word(models.Model):
    """ 
    This is the list of words that will be available for the game 
    """
    word = models.CharField(max_length=50)


class Cell(models.Model):
    """ 
    This will be the cell list for a specific game, each cell will have coordinate and a specific word 
    The color parameter is here to know if the cell is for a team or another team or neutral 
    the parameter found allow us to know is the cell has been found by the players and should be hidden 
    """

    x = models.IntegerField()
    y = models.IntegerField()
    word = models.ForeignKey('Word', on_delete=models.CASCADE)
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    color = models.CharField(default='N', max_length=1)
    found = models.BooleanField(default=False)


class Game(models.Model):
    """
    Describe any game and its parameters 
    """
    status = models.CharField(default='P', max_length=1)

    def check_end_of_game(self):

        for color in TEAM_COLORS:
            if self.cell_set.filter(color=color[0]).count() == self.cell_set.filter(color=color[0], found=True).count():
                status = color[0]
        self.save()


class Team(models.Model):
    """ 
    Represent a team in the game. there either one or two teams 
    """
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    leader = models.OneToOneField('Player', on_delete=models.CASCADE, related_name='leader')
    color = models.CharField(default='R', max_length=1, choices=TEAM_COLORS)


class Player(models.Model):
    """ 
    Describe players attributes such as its team 
    the cell attribute is the cell that a player has selected
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)
    cell = models.ForeignKey('Cell', on_delete=models.CASCADE, null=True)

class Round(models.Model):
    """ 
    Describe a round for the game
    the word is played by the team leader and the others members of the team have to find it
    The number of cells is the number of cells the team players have to find during the round
    We add in found the list of cells found as history of the game and allow to know if the round shoud end
    """
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    word = models.CharField(max_length=50, null=True)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)
    status = models.CharField(default='G', max_length=50)
    number_of_cells = models.IntegerField(default=1)
    found = models.ManyToManyField('Cell')

    def submit_cell_choice(self) :
        team = self.team
        chosen_cell = None
        for player in team.player_set.all():
            if player == team.leader or not player.cell:
                continue
            if not chosen_cell:
                chosen_cell = player.cell
            # we check if all players have chosen the same cell, if not we change the status to Issue
            elif chosen_cell != player.cell:
                status = 'I'
                self.save()
                return
        # If no player chose a cell the status stay on waiting (may be not needed)
        if not chosen_cell:
            status = 'W'
        else:
            found.add(chosen_cell)
            # If all cells for the round have been found or if the cell found is not for the correct team the round is over
            # TODO check how to do to work with the black cell -> end the game
            if found.count() == number_of_cells or cell.color != team.color:
                status = 'E'
            else:
                status = 'N'
            self.save()
                
                

