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
  return (
    <Card className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <GridOnIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            props.status === "P" ? "Game is in preparation" : "Game has started"
          }
          secondary={props.dateCreated}
        />
        <Typography>
          {props.status === "P" ? "Join the game" : "Watch the game"}
        </Typography>
      </ListItem>
    </Card>
  );
}
