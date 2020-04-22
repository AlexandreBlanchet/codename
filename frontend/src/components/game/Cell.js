import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    padding: theme.spacing(1),
    textAlign: "center",
    fontSize: "50%",
    color: theme.palette.text.secondary,
    width: 100,
    height: 100,
  },
}));

export default function GameCell(props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      style={{ backgroundColor: colors[props.cell.color] }}
    >
      {props.cell.word}
    </Button>
  );
}

// Color Theme
const colors = {
  R: "indianred",
  B: "dodgerblue",
  N: "lightgrey",
};
