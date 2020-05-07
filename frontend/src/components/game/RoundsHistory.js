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
    margin: theme.spacing(1),
    boxShadow: "None",
    border: "1px solid grey",
  },
  card: {
    margin: "10px",
  },
  title: {
    fontSize: 14,
  },
  teams: {},
}));

function RoundsHistory(props) {
  const classes = useStyles();
  const rounds = props.rounds.reverse().filter((round) => round.status !== "P");

  return (
    <>
      {rounds.map((round, index) => {
        return (
          <Card key={round.id} className={classes.card}>
            <CardContent>
              <Typography gutterBottom>
                <b>Tour {rounds.length - index} :</b>{" "}
                <i style={{ color: colors[round.team.color] }}>
                  Equipe {teamsName[round.team.color]}
                </i>
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <Typography>
                      Mot proposé : <b>{round.word}</b>{" "}
                    </Typography>
                    <Typography>
                      Nombre de cartes à trouver :{" "}
                      <b>{round.number_of_cells}</b>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <Typography>Cartes trouvées :</Typography>
                    {round.found.map((cell) => (
                      <Typography key={cell.id}>
                        <b style={{ color: colors[cell.color] }}>{cell.word}</b>{" "}
                        <i style={{ color: colors[cell.color] }}>
                          (équipe {teamsName[cell.color]})
                        </i>
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    rounds: state.game.rounds,
    teams: state.game.teams,
  };
})(RoundsHistory);
