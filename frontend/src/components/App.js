import React, { Component, setState } from "react";
import { render } from "react-dom";
import Container from "@material-ui/core/Container";
import Game from "./Game";
import GameAppBar from "./GameAppBar";
import Lobby from "./Lobby";
import Home from "./Home";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

class App extends Component {
  state = {
    gameId: null,
    loaded: false,
    placeholder: "Loading",
    userId: JSON.parse(document.getElementById("user_id").textContent),
  };

  render() {
    return (
      <Router basename="/codename">
        <div>
          <GameAppBar />
          <Container maxWidth="sm">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/lobby">
                <Lobby />
              </Route>
              <Route path="/game/:id">
                <Game userId={this.state.userId} />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
