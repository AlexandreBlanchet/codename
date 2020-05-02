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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
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
  const teamLeader = props.teams.filter(
    (team) => team.id == props.round.team
  )[0].leader.user;

  if (teamLeader.username !== props.user.username) {
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
          The following word has been proposed for the Red team
        </Typography>
        <div className={classes.elems}>
          <TextField
            id="outlined-full-width"
            label="Given Word"
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
            label="cells found"
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