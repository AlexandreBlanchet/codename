import React, { Component, useState, useEffect } from "react";
import GameGrid from "./Grid";
import RoundForm from "./RoundForm";
import RoundDisplay from "./RoundDisplay";
import GameParams from "./GameParams";
import { useParams } from "react-router-dom";
import { wsConnect } from "../../actions/game";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import AlertMessage from "./Alert";
import RoundsHistory from "./RoundsHistory";

const Game = (props) => {
  let { id } = useParams();

  useEffect(() => {
    props.dispatch(wsConnect(id));
  }, []);

  if (props.currentRound && props.status === "S") {
    var round =
      props.currentRound.status === "P" ? (
        props.user.username === props.currentRound.team.leader.user.username ? (
          <RoundForm />
        ) : null
      ) : (
        <RoundDisplay />
      );
  }

  return (
    <>
      <AlertMessage />
      {props.status ? (
        <Grid
          container
          justify="center"
          spacing={2}
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={12} sm={6}>
            <GameParams />
            {round}
          </Grid>

          {props.status !== "P" ? (
            <>
              <Grid item xs={12} sm={6}>
                <GameGrid />
              </Grid>
              <Grid item xs={12} sm={12}>
                <RoundsHistory />
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      ) : (
        <LinearProgress />
      )}
    </>
  );
};

export default connect(function mapStateToProps(state) {
  return {
    currentRound: state.game.currentRound,
    teams: state.game.teams,
    user: state.auth.user,
    status: state.game.status,
  };
})(Game);
