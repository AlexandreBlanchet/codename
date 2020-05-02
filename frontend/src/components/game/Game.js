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

const Game = (props) => {
  let { id } = useParams();

  useEffect(() => {
    props.dispatch(wsConnect(id));
  }, []);

  if (props.currentRound && props.status === "S") {
    const teamLeader = props.teams.filter(
      (team) => team.id == props.currentRound.team
    )[0].leader.user;
    var round =
      props.currentRound.status === "P" ? (
        props.user.username === teamLeader.username ? (
          <RoundForm />
        ) : null
      ) : (
        <RoundDisplay />
      );
  }

  return (
    <>
      {props.status ? (
        <Grid
          container
          justify="center"
          spacing={3}
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12} sm={6}>
            <GameParams />
            {round}
          </Grid>
          <Grid item xs={12} sm={6}>
            <GameGrid />
          </Grid>
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
