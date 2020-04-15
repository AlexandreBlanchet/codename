import React, { Component, setState } from "react";
import { render } from "react-dom";
import Container from '@material-ui/core/Container';
import Game from "./Game";
import GameAppBar from "./GameAppBar";
import Lobby from "./Lobby";

class App extends Component {
  state = {
      gameId: null,
      loaded: false,
      placeholder: "Loading"
    };
  
  handleGameSelect = gameId => {
      this.setState({gameId: gameId});

  }


  render() {
    return (
        <>
        <GameAppBar />
        <Container maxWidth="sm">
            {this.state.gameId == null ? (
                <Lobby handleGameSelect={this.handleGameSelect} />
            ) : (
                <Game gameId={this.state.gameId}/>
            )}
            
        </Container>   
        </>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);