import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { wsConnect } from "../../actions/gameList";

import LobbyParams from "./LobbyParams";
import Game from "./Game";

const Lobby = (props) => {
  useEffect(() => {
    props.dispatch(wsConnect());
  }, []);

  return (
    <>
      <LobbyParams />
      <List className="Lobby">
        {props.games.map((value) => (
          <Link
            key={value.id}
            style={{ textDecoration: "none" }}
            to={"/game/" + value.id}
          >
            <Game status={value.status} dateCreated={value.date_created} />
          </Link>
        ))}
      </List>
    </>
  );
};

export default connect(function mapStateToProps(state) {
  return {
    games: state.gameList.gameList,
  };
})(Lobby);
