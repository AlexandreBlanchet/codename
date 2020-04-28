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

const useStyles = makeStyles({
  root: {},
  title: {
    fontSize: 14,
  },
  teams: {
    display: "flex",
  },
});

function GameParams(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Welcome to the Codename game !
        </Typography>
        <div className={classes.teams}>
          <Team color="B" />
          <Team color="R" />
        </div>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => props.dispatch(startGame())}>
          Start
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    teams: state.game.teams,
  };
})(GameParams);
