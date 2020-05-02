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
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { connect } from "react-redux";
import { removePlayer, selectLeader } from "../../actions/game";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const colors = {
  R: "indianred",
  B: "dodgerblue",
};

function Player(props) {
  const classes = useStyles();
  const username = props.player.user.username;
  if (
    (props.user.username === username ||
      props.user.username == props.gameOwner.username) &&
    props.status === "P"
  ) {
    var deleteButton = (
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => props.dispatch(removePlayer(props.player.id))}
        >
          <HighlightOffIcon />
        </IconButton>
      </ListItemSecondaryAction>
    );
  }

  const handleClick = () => {
    if (props.user.username == props.gameOwner.username) {
      props.dispatch(selectLeader(props.player.id));
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        {props.leader.id === props.player.id ? (
          <IconButton edge="end">
            <RecordVoiceOverIcon style={{ color: colors[props.color] }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleClick} edge="end">
            <PersonTwoToneIcon style={{ color: colors[props.color] }} />
          </IconButton>
        )}
      </ListItemAvatar>
      <ListItemText primary={username} />
      {deleteButton}
    </ListItem>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    status: state.game.status,
    user: state.auth.user,
    gameOwner: state.game.gameOwner,
  };
})(Player);
