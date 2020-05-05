import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { wsConnect } from "../../actions/gameList";

import LobbyParams from "./LobbyParams";
import Game from "./Game";
import { actionTypes as types } from "../../constants";

const Lobby = (props) => {
  useEffect(() => {
    props.dispatch(wsConnect());
  }, []);

  if (props.createdGameId) {
    props.dispatch({ type: types.REDIRECT_TO_GAME });
    return <Redirect to={"/game/" + props.createdGameId} />;
  }

  return (
    <>
      {props.games ? (
        <>
          <LobbyParams />
          <List className="Lobby">
            {props.games
              .filter((game) => game.status === "P" || game.status === "S")
              .map((game) => (
                <Link
                  key={game.id}
                  style={{ textDecoration: "none" }}
                  to={"/game/" + game.id}
                >
                  <Game
                    status={game.status}
                    owner={game.owner}
                    dateCreated={game.date_created}
                  />
                </Link>
              ))}
          </List>
        </>
      ) : (
        <LinearProgress />
      )}
    </>
  );
};

export default connect(function mapStateToProps(state) {
  return {
    games: state.gameList.gameList,
    createdGameId: state.gameList.createdGameId,
  };
})(Lobby);
