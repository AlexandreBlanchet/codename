import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { createNewGame } from "../../actions/gameList";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
  },
  title: {
    fontSize: 14,
  },
  teams: {
    display: "flex",
  },
});

function LobbyParams(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Welcome to Codename !
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => props.dispatch(createNewGame())}
        >
          Create new game
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    teams: state.game.teams,
    status: state.game.status,
    user: state.auth.user,
    gameOwner: state.game.gameOwner,
  };
})(LobbyParams);
