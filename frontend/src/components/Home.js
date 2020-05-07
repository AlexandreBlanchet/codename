import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
  },
  card: {
    width: "800px",
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    border: "1px solid grey",
  },
  media: {
    height: "600px",
  },
}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          bienvenue sur NameCode !
        </Typography>
        <Typography variant="h6" gutterBottom>
          {" "}
          Le but du jeu :
        </Typography>
        <Typography>
          Trouver toutes les cartes de sa couleur avant l'équipe adverse.
        </Typography>
        <Typography gutterBottom>
          Dans chaque équipe une personne doit faire trouver les mots à ses
          coéquipiers.
        </Typography>
        <Typography>Le jeu peut également se jouer à deux !</Typography>
        <Typography>
          Dans ces cas-là, le but est de trouver toutes les cartes de son équipe
          avec le moins de tours possible.
        </Typography>
      </Paper>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/frontend/images/namecode3.png"
          title="Contemplative Reptile"
        />
      </Card>
    </div>
  );
}
