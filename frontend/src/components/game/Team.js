import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { joinTeam } from "../../actions/game";
import Player from "./Player";
import List from "@material-ui/core/List";

const useStyles = makeStyles({
  root: {
    width: "260px",
    boxShadow: "None",
    border: "1px solid grey",
    margin: "10px",
  },
  cardContent: {
    paddingRight: "0px",
  },
});

export const teamsName = {
  R: "rouge",
  B: "bleue",
  N: "neutre",
  O: "",
};

export const colors = {
  R: "indianred",
  B: "dodgerblue",
  N: "lightgrey",
  O: "dimgrey",
};

function Team(props) {
  const classes = useStyles();

  if (
    props.status === "P" &&
    props.team.players.filter(
      (player) => player.user.username === props.user.username
    ).length === 0
  ) {
    var button = (
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={() => props.dispatch(joinTeam(props.team.color))}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          Rejoindre
        </Button>
      </CardActions>
    );
  }
  if (props.status !== "P") {
    var score = (
      <Typography color="textSecondary" gutterBottom>
        {
          props.cells.filter(
            (cell) => cell.color === props.team.color && cell.found === true
          ).length
        }{" "}
        / {props.rounds[0].team.id === props.team.id ? "9" : "8"} Cartes
        trouvées
      </Typography>
    );
  }
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom style={{ color: colors[props.team.color] }}>
          Equipe {teamsName[props.team.color]}
        </Typography>
        {score}
        <List dense={true}>
          {props.team.players.map((player) => (
            <Player
              key={player.id}
              player={player}
              leader={props.team.leader}
              color={props.team.color}
            />
          ))}
        </List>
      </CardContent>
      {button}
    </Card>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    status: state.game.status,
    rounds: state.game.rounds,
    user: state.auth.user,
    cells: state.game.cells,
  };
})(Team);
