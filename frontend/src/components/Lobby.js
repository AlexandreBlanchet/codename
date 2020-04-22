import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { wsConnect } from "../actions/gameList";

const Lobby = (props) => {
  useEffect(() => {
    props.dispatch(wsConnect("games"));
  }, []);

  return (
    <List className="Lobby">
      {props.games.map((value) => (
        <Link
          key={value.pk}
          style={{ textDecoration: "none" }}
          to={"/game/" + value.pk}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={value.status} secondary="Jan 9, 2014" />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default connect(function mapStateToProps(state) {
  return {
    games: state.gameList.gameList,
  };
})(Lobby);
