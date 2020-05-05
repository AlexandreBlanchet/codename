import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { startGame } from "../../actions/game";
import Team from "./Team";
import Paper from "@material-ui/core/Paper";
import { teamsName, colors } from "./Team";
import GameOver from "./GameOver";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    boxShadow: "None",
    border: "1px solid grey",
  },
  title: {
    fontSize: 14,
  },
  teams: {},
}));

function GameParams(props) {
  const classes = useStyles();

  if (
    props.status === "P" &&
    props.gameOwner.username === props.user.username
  ) {
    var startButton = (
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => props.dispatch(startGame())}
        >
          Start
        </Button>
      </CardActions>
    );
  }

  if (props.status === "O" || props.status === "R" || props.status === "B") {
    const userTeam = props.teams.filter(
      (team) =>
        team.players.filter(
          (player) => player.user.username === props.user.username
        ).length === 1
    )[0];

    if (props.status === "O")
      var message =
        "Perdu ! Vous avez trouvé la carte noir, vous ferez mieux la prochaine fois ;)";
    else {
      const winnerTeam = props.teams.filter(
        (team) => team.color === props.status
      )[0];
      const teamNbRounds = props.rounds.filter(
        (round) => round.team === winnerTeam.id
      );
      if (userTeam) {
        var message =
          userTeam.color === props.status
            ? "Yeah, Vous avez gagné :)"
            : "Mince vous avez perdu :'(";
      }
      var message2 =
        "L'équipe " +
        teamsName[props.status] +
        " à réussi a trouver toutes ses cartes en " +
        teamNbRounds.length +
        " manches";
    }
  }

  if (props.status === "P") {
    var message = "Choisissez avec quelle équipe vous souhaitez jouer";
  }
  if (props.status === "S") {
    const currentTeam = props.teams.filter(
      (team) => team.id === props.currentRound.team
    )[0];
    var message = (
      <>
        <Typography>Tour numéro {props.rounds.length} </Typography>
        <Typography style={{ color: colors[currentTeam.color] }}>
          C'est à la team <b>{teamsName[currentTeam.color]}</b> de jouer
        </Typography>
        {props.currentRound.status === "P" ? (
          <Typography color="textSecondary">
            <b> {currentTeam.leader.user.username} </b> doit proposer un mot
            permettant de trouver un maximum de cartes
          </Typography>
        ) : (
          <Typography color="textSecondary">
            {currentTeam.players
              .filter((player) => player.id != currentTeam.leader.id)
              .map((player) => player.user.username)
              .join(" et ")}
            {currentTeam.players.filter(
              (player) => player.id != currentTeam.leader.id
            ).length === 1
              ? " doit "
              : " doivent "}
            trouver
            {props.currentRound.number_of_cells === 1
              ? " la carte "
              : " les cartes "}
            pour le mot proposé
          </Typography>
        )}
      </>
    );
  }

  return (
    <>
      <GameOver status={props.status} message={message} />
      <Card>
        <CardContent>
          {" "}
          {props.status === "P" ? (
            <Typography gutterBottom>
              Partie créée par {props.gameOwner.username}
            </Typography>
          ) : (
            <></>
          )}
          <Grid container>
            {props.teams.map((team) => (
              <Grid item key={team.id}>
                <Team team={team} />
              </Grid>
            ))}
          </Grid>
          <Paper className={classes.paper}>
            <Typography>{message}</Typography>
            <Typography>{message2}</Typography>
          </Paper>
        </CardContent>
        {startButton}
      </Card>
    </>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    rounds: state.game.rounds,
    currentRound: state.game.currentRound,
    teams: state.game.teams,
    status: state.game.status,
    user: state.auth.user,
    gameOwner: state.game.gameOwner,
  };
})(GameParams);
