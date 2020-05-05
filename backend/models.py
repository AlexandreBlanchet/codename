from django.db import models
from django.contrib.auth.models import User
import random
import datetime
from django.db.models import Q

TEAM_COLORS = (
    ('R', 'Red'),
    ('B', 'Blue'),
)
BOARD_SIZE = 5

STATUS = (
    ('P', 'Preparation'),
    ('S', 'Started'),
    ('O', 'Over')
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
    no need to have cell position we don't care where they because we've only one grid and team leaders can see on the grid the color of the cell
    it doesn't need to be rectangular as well, so responsive
    As the word object has only one property it's not necessary to have the link to the word, we get the word instead in a charfield
    """

    word = models.CharField(max_length=50)
    game = models.ForeignKey(
        'Game', on_delete=models.CASCADE, related_name='cells')
    color = models.CharField(default='N', max_length=1)
    found = models.BooleanField(default=False)


class Team(models.Model):
    """ 
    Represent a team in the game. there either one or two teams 
    """
    game = models.ForeignKey(
        'Game', on_delete=models.CASCADE, related_name="teams")
    leader = models.OneToOneField(
        'Player', on_delete=models.DO_NOTHING, related_name='leader_team', null=True)
    color = models.CharField(default='R', max_length=1, choices=TEAM_COLORS)

    def get_not_leader_players(self):
        players = list(self.players.all())
        if self.leader in players:
            players.remove(self.leader)
        return players


class Game(models.Model):
    """
    Describe any game and its parameters 
    """
    status = models.CharField(default='P', max_length=1)
    date_created = models.DateTimeField(auto_now_add=True)
    last_active = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        create_teams = False
        if not self.pk:
            create_teams = True
        super(Game, self).save(*args, **kwargs)
        if create_teams:
            Team.objects.create(game=self, color="R")
            Team.objects.create(game=self, color="B")

    def join_team(self, user, team):
        if self.status != 'P':
            return
        player = Player.objects.filter(user=user, game=self)
        if player.count() == 1:
            player = player[0]
            playerTeam = player.team
            if playerTeam.leader == player:
                playerTeam.leader = None
                playerTeam.save()
            player.delete()

            if playerTeam.players.count() > 0 and not playerTeam.leader:
                playerTeam.leader = playerTeam.players.all()[0]
                playerTeam.save()

        team = Team.objects.get(game=self, color=team)
        player = Player.objects.create(user=user, game=self, team=team)

        if team.players.count() == 1:
            player.team.leader = player
            player.team.save()

        # Save game generate update object event for all consumers
        self.save()

    def remove_player(self, user, player_id):
        if self.status != 'P':
            return
        player = Player.objects.get(pk=player_id)
        if user != self.owner and user != player.user:
            return
        team = player.team
        if player.team.leader == player:
            player.team.leader = None
            player.team.save()
        player.delete()

        if team.players.count() > 0:
            team.leader = team.players.all()[0]
            team.save()
        # Save game generate update object event for all consumers
        self.save()

    def get_the_other_team(self, team):
        for elem in self.teams.all():
            if elem != team:
                return elem
        return team

    def select_cell(self, user, cell_id):
        if self.status != 'S':
            return
        currentPlayer = Player.objects.filter(user=user, game=self)
        if currentPlayer.count() != 1:
            return
        currentPlayer = currentPlayer[0]

        current_round = self.rounds.all().order_by("-pk")[0]
        if currentPlayer not in current_round.team.get_not_leader_players() or current_round.status != 'S':
            return
        # If one of the players has validated its choice we can't select another cell
        for player in currentPlayer.team.get_not_leader_players():
            if player.valid_choice:
                return

        cell = Cell.objects.get(pk=cell_id)
        if cell.found:
            return

        currentPlayer.cell = cell
        currentPlayer.save()
        # Save game generate update object event for all consumers
        self.save()

    def select_leader(self, player_id):
        if self.status != 'P':
            return
        player = Player.objects.get(pk=player_id)
        player.team.leader = player
        player.team.save()
        self.save()

    def submit_word(self, user, word, number):
        if self.status != 'S':
            return
        current_round = self.rounds.all().order_by("-pk")[0]
        player = Player.objects.filter(user=user, game=self)
        if player.count() != 1:
            return
        player = player[0]
        if current_round.status != 'P' or current_round.team.leader != player:
            return
        current_round.word = word
        current_round.number_of_cells = number
        current_round.status = 'S'
        current_round.save()
        self.save()

    def submit_cell(self, user):
        if self.status != 'S':
            return ("La partie n'est pas dans l'état démarrée", 403)
        current_round = self.rounds.all().order_by("-pk")[0]
        currentPlayer = Player.objects.filter(user=user, game=self)
        if currentPlayer.count() != 1:
            return ("L'utilisateur n'existe pas", 403)
        currentPlayer = currentPlayer[0]
        if current_round.status != 'S':
            return ("La le round n'est pas dans l'état démarrée", 403)
        if currentPlayer not in current_round.team.get_not_leader_players():
            return ("Ce n'est pas a votre tour de proposer une carte", 403)
        cell_selected = None
        for player in currentPlayer.team.get_not_leader_players():
            if not player.cell:
                if user != player.user:
                    return (player.user.username + " n'a pas selectionné de carte", 403)
                else:
                    return ("Vous n'avez pas selectionné de carte", 403)
            if not cell_selected:
                cell_selected = player.cell
            elif cell_selected != player.cell:
                return ("tous les joueurs n'ont pas selectionnés la même carte", 403)

        if cell_selected.found:
            return ("La carte selectionnée à déjà été trouvée", 403)

        cell_selected.found = True
        cell_selected.save()
        current_round.found.add(cell_selected)

        if cell_selected.color != current_round.team.color or current_round.found.count() == current_round.number_of_cells:
            current_round.status = 'E'
            current_round.save()

        # color O means Over, this is the cell that end the game the team who find the cell loose
        if cell_selected.color == 'O':
            if self.teams.count() == 1:
                self.status = 'O'
            else:
                self.status = self.get_the_other_team(current_round.team).color
        elif self.cells.filter(color=current_round.team.color).count() == self.cells.filter(color=current_round.team.color, found=True).count():
            self.status = current_round.team.color
        elif current_round.status == 'E':
            Round.objects.create(
                game=self, team=self.get_the_other_team(current_round.team))

        for player in player.team.get_not_leader_players():
            player.cell = None
            player.valid_choice = False
            player.save()

        self.save()
        if cell_selected.color != current_round.team.color:
            return ("Mince vous êtes tombé sur une mauvaise carte !", 201)
        else:
            return ("Bravo vous avez trouvé une carte de votre équipe !", 200)

    def stop_round(self, user):
        if self.status != 'S':
            return
        current_round = self.rounds.all().order_by("-pk")[0]
        player = Player.objects.filter(user=user, game=self)
        if player.count() != 1:
            return
        player = player[0]
        if current_round.status != 'S' or player not in current_round.team.get_not_leader_players():
            return
        current_round.status = 'E'
        current_round.save()
        Round.objects.create(
            game=self, team=self.get_the_other_team(current_round.team))
        for player in player.team.get_not_leader_players():
            player.cell = None
            player.valid_choice = False
            player.save()
        self.save()

    def start(self, user):
        if self.status != 'P' or self.owner != user:
            return
        self.status = 'S'
        words = list(Word.objects.all())
        random.shuffle(words)
        for team in self.teams.all():
            if team.players.count() == 1:
                return
        ok = False
        for team in self.teams.all():
            if team.players.count() > 1:
                ok = True

        if not ok:
            return

        for team in self.teams.all():
            if team.players.count() == 0:
                team.delete()

        colors = ['N']*7 + ['R']*8 + ['B']*8 + ['O']
        if random.choice([True, False]) and self.teams.count() == 2:
            startingTeam = self.teams.all()[1]
        else:
            startingTeam = self.teams.all()[0]
        colors.append(startingTeam.color)

        random.shuffle(colors)
        for i in range(BOARD_SIZE**2):
            Cell.objects.create(game=self, color=colors[i], word=words[i].word)
        # Creating first round with no data
        # Red has one more cell then they start TODO make it random ?

        Round.objects.create(game=self, team=startingTeam)
        self.save()


class Player(models.Model):
    """ 
    Describe players attributes such as its team 
    the cell attribute is the cell that a player has selected
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(
        'Game', on_delete=models.CASCADE, related_name='players')
    team = models.ForeignKey(
        'Team', on_delete=models.CASCADE, related_name='players')
    cell = models.ForeignKey(
        'Cell', on_delete=models.CASCADE, null=True, related_name='players')
    valid_choice = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'game',)


class Round(models.Model):
    """ 
    Describe a round for the game
    the word is played by the team leader and the others members of the team have to find it
    The number of cells is the number of cells the team players have to find during the round
    We add in found the list of cells found as history of the game and allow to know if the round shoud end
    """
    game = models.ForeignKey(
        'Game', on_delete=models.CASCADE, related_name="rounds")
    word = models.CharField(max_length=50, null=True)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)
    status = models.CharField(default='P', max_length=50)
    number_of_cells = models.IntegerField(default=1)
    found = models.ManyToManyField('Cell')

    def submit_cell_choice(self):
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
