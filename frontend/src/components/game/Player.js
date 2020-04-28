import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import PersonTwoToneIcon from "@material-ui/icons/PersonTwoTone";
import IconButton from "@material-ui/core/IconButton";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Player(props) {
  const classes = useStyles();
  const username = props.player.user.username;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <PersonTwoToneIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={username} secondary="Jan 9, 2014" />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments">
          {props.leader ? <RecordVoiceOverIcon /> : <PersonTwoToneIcon />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
