import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GameCell from './Cell'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 532,
  },
}));

export default function GameGrid(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
        <Grid container justify="center" spacing={1}>
          {props.cells.map((value) => (
            <Grid key={value.id} item xs>
              <GameCell cell={value} />
            </Grid>
          ))}
        </Grid>
    </Paper>
  );
}