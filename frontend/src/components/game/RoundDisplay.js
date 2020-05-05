import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { submitCell, stopRound } from "../../actions/game";
import { connect } from "react-redux";
import { teamsName } from "./Team";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    marginTop: "20px",
  },
  elems: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
}));

function RoundDisplay(props) {
  const classes = useStyles();
  const currentTeam = props.teams.filter(
    (team) => team.id == props.round.team
  )[0];

  const isInTeam =
    currentTeam.players.filter(
      (player) => player.user.username === props.user.username
    ).length > 0;
  if (currentTeam.leader.user.username !== props.user.username && isInTeam) {
    var button = (
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => props.dispatch(submitCell())}
        >
          Submit cell {props.round.found.length + 1}
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => props.dispatch(stopRound())}
        >
          Stop
        </Button>
      </CardActions>
    );
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Le mot suivant à été proposé pour l'équipe{" "}
          {teamsName[currentTeam.color]}
        </Typography>
        <div className={classes.elems}>
          <TextField
            id="outlined-full-width"
            label="Mot proposé"
            defaultValue={props.round.word}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-full-width"
            label="Cartes trouvées"
            value={
              props.round.found.length + " / " + props.round.number_of_cells
            }
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </CardContent>
      {button}
    </Card>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    round: state.game.currentRound,
    teams: state.game.teams,
    user: state.auth.user,
  };
})(RoundDisplay);
