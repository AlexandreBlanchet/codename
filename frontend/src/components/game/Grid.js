import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GameCell from "./Cell";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import cardContent from "@material-ui/core/CardContent";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function GameGrid(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="center" spacing={1}>
          {props.cells.map((value) => (
            <Grid key={value.id} item xs>
              <GameCell cell={value} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    cells: state.game.cells,
  };
})(GameGrid);
