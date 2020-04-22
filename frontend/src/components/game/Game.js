import React, { Component, useState } from "react";
import GameGrid from "./Grid";
import RoundForm from "./RoundForm";
import GameParams from "./GameParams";
import { useParams } from "react-router-dom";
const URL = "ws://localhost:8000/ws/game";

const Game = (props) => {
  const [game, setGame] = useState({ status: "P", cells: [], player_set: [] });
  const [ws, setWs] = useState(new WebSocket(URL));

  let { id } = useParams();

  ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log("connected");

    ws.send(
      JSON.stringify({ action: "subscribe_instance", pk: id, request_id: 4 })
    );
    ws.send(JSON.stringify({ action: "retrieve", pk: id, request_id: 1 }));
  };

  ws.onmessage = (evt) => {
    // on receiving a message, add it to the list of messages
    const message = JSON.parse(evt.data);
    console.log(message);
    if (message.action === "retrieve") {
      setGame(message.data);
      // TODO to be modified when we choose a game and we're not currently in it, we add our user to the player list of the game
      if (
        message.data.players.filter((player) => player.user == props.userId)
          .length == 0
      ) {
        ws.send(
          JSON.stringify({ action: "add_player", pk: id, request_id: 2 })
        );
      }
    }
    if (message.action === "update") {
      setGame(message.data);
    }
  };

  ws.onclose = () => {
    console.log("disconnected");
    // automatically try to reconnect on connection loss
    setWs(new WebSocket(URL));
  };

  const handleStart = () => {
    const message = { action: "start_game", pk: props.gameId, request_id: 2 };
    ws.send(JSON.stringify(message));
  };

  return (
    <div className="game">
      <GameParams handleStart={handleStart} />
      <RoundForm />
      <GameGrid cells={game.cells} />
    </div>
  );
};

export default Game;
