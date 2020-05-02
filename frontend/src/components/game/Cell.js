import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { connect } from "react-redux";
import { selectCell } from "../../actions/game";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    padding: 0,
    color: theme.palette.text.secondary,
    width: 105,
    height: 105,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 14,
  },
  avatarGroup: {
    "& .MuiAvatar-root": {
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: 14,
    },
  },
}));

function GameCell(props) {
  const classes = useStyles();

  return (
    <Tooltip disableHoverListener={!props.cell.found} title={props.cell.word}>
      <Button
        className={classes.button}
        style={{ backgroundColor: colors[props.cell.color] }}
        onClick={() => props.dispatch(selectCell(props.cell.id))}
      >
        <Card
          className={classes.button}
          style={{ backgroundColor: colors[props.cell.color] }}
        >
          <CardHeader
            title={props.cell.found ? "" : props.cell.word}
            titleTypographyProps={{ variant: "caption" }}
          ></CardHeader>

          <CardContent>
            <AvatarGroup max={2} className={classes.avatarGroup}>
              {props.cell.players.map((player) => (
                <Avatar key={player.id} className={classes.avatar}>
                  {player.user.username.charAt(0)}
                </Avatar>
              ))}
            </AvatarGroup>
          </CardContent>
        </Card>
      </Button>
    </Tooltip>
  );
}

export default connect()(GameCell);

// Color Theme
const colors = {
  R: "indianred",
  B: "dodgerblue",
  N: "lightgrey",
  O: "dimgrey",
};
