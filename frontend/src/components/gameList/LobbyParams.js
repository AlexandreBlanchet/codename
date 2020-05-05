import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { createNewGame } from "../../actions/gameList";
import { Redirect } from "react-router-dom";

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

  const createGame = () => {
    props.dispatch(createNewGame());
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Bienvenue sur Codename
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={createGame}
        >
          Créer une nouvelle partie
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
