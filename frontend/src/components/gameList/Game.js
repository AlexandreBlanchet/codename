import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import GridOnIcon from "@material-ui/icons/GridOn";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px",
  },
}));

export default function Game(props) {
  const classes = useStyles();
  const date = new Date(props.dateCreated);
  const currentDate = new Date();
  const timestampDiff = currentDate.getTime() - date.getTime();
  const days = Math.floor(timestampDiff / 1000 / 24 / 60 / 60);
  const hours = Math.floor(
    (timestampDiff - days * 1000 * 24 * 60 * 60) / 1000 / 60 / 60
  );
  const minutes = Math.floor(
    (timestampDiff - days * 1000 * 24 * 60 * 60 - hours * 1000 * 60 * 60) /
      1000 /
      60
  );

  var dateMessage = "";

  if (days) {
    dateMessage += " " + days + " jour";
    if (days > 1) dateMessage += "s";
  }

  if (hours) {
    dateMessage += " " + hours + "  heure";
    if (hours > 1) dateMessage += "s";
  }

  if (minutes) {
    dateMessage += " " + minutes + "  minute";
    if (minutes > 1) dateMessage += "s";
  }

  dateMessage = dateMessage == "" ? "A l'instant" : "Il y a " + dateMessage;

  if (props.owner) {
    var owner = (
      <Typography>
        Créée par <b>{props.owner.username}</b>
      </Typography>
    );
  }

  if (props.status === "P") var status = "Partie en recherche de joueurs";
  else if (props.status === "S") var status = "Partie en cours";
  else var status = "Partie terminée";

  return (
    <Card className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <GridOnIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={status} secondary={dateMessage} />
        {owner}
      </ListItem>
    </Card>
  );
}
