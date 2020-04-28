import React, { Component, useState, useEffect } from "react";
import GameGrid from "./Grid";
import RoundForm from "./RoundForm";
import RoundDisplay from "./RoundDisplay";
import GameParams from "./GameParams";
import { useParams } from "react-router-dom";
import { wsConnect } from "../../actions/game";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

const Game = (props) => {
  let { id } = useParams();

  useEffect(() => {
    props.dispatch(wsConnect(id));
  }, []);

  if (props.currentRound) {
    var round =
      props.currentRound.status === "P" ? <RoundForm /> : <RoundDisplay />;
  }

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item xs={12} sm={6}>
        <GameParams />
        {round}
      </Grid>
      <Grid item xs={12} sm={6}>
        <GameGrid />
      </Grid>
    </Grid>
  );
};

export default connect(function mapStateToProps(state) {
  return {
    currentRound: state.game.currentRound,
  };
})(Game);
