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
import { teamsName } from "./Team";
import GameOver from "./GameOver";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: "None",
    border: "1px solid grey",
  },
  title: {
    fontSize: 14,
  },
  teams: {
    display: "flex",
  },
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
        "GameOver ! You found the black till, you'll do bether next time ;)";
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
            ? "Yeah, you won :)"
            : "Too bad you lost :'(";
      }
      var message2 =
        teamsName[props.status] +
        " team managed to find all its tills in " +
        teamNbRounds.length +
        " rounds";
    }
  }

  if (props.status === "P") {
    var message = "Select the team you want to play with.";
  }
  if (props.status === "S") {
    const currentTeam = props.teams.filter(
      (team) => team.id === props.currentRound.team
    )[0];
    var message = (
      <>
        <Typography>It's the round number {props.rounds.length} </Typography>
        <Typography color="textSecondary">
          It's team {teamsName[currentTeam.color]} to play
        </Typography>
        {props.currentRound.status === "P" ? (
          <Typography color="textSecondary">
            {currentTeam.leader.user.username} has to propose a word
          </Typography>
        ) : (
          <Typography color="textSecondary">
            {currentTeam.players
              .filter((player) => player.id != currentTeam.leader.id)
              .map((player) => player.user.username)
              .join("and")}
            {currentTeam.players.filter(
              (player) => player.id != currentTeam.leader.id
            ).length === 1
              ? " has "
              : " have "}
            to find the till
            {props.currentRound.number_of_cells === 1 ? "" : "s"}
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
          <Typography gutterBottom>Welcome to the Codename game !</Typography>
          <div className={classes.teams}>
            {props.teams.map((team) => (
              <Team key={team.id} team={team} />
            ))}
          </div>
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
