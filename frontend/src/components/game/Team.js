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
    width: "400px",
  },
});

function Team(props) {
  const classes = useStyles();

  const team = props.teams.filter((elem) => elem.color === props.color);
  let players = null;
  if (team.length > 0) {
    players = team[0].players.map((player) => {
      const leader =
        team[0].leader && player.id == team[0].leader.id ? true : false;

      return <Player key={player.id} player={player} leader={leader} />;
    });
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Team {props.color}
        </Typography>
        <List dense={true}>{players}</List>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => props.dispatch(joinTeam(props.color))}
        >
          Join team
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    teams: state.game.teams,
  };
})(Team);
