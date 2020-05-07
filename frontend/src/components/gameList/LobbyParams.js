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

  const createGame = () => {
    props.dispatch(createNewGame());
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Bienvenue sur NameCode
        </Typography>
        <Typography gutterBottom>Ci-dessous la liste des parties</Typography>
        <Typography color="textSecondary" gutterBottom>
          Vous pouvez rejoindre une partie en attente de joueurs ou créer votre
          propre partie !
        </Typography>
        <Typography color="textSecondary">
          Vous pouvez également regarder une partie déjà en cours :)
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={createGame}
          style={{ margin: "10px" }}
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
