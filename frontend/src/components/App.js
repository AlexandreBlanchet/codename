import React, { Component, setState } from "react";
import { render } from "react-dom";
import Container from "@material-ui/core/Container";
import Game from "./game/Game";
import GameAppBar from "./GameAppBar";
import Lobby from "./gameList/Lobby";
import Home from "./Home";
import Login from "./authentication/Login";
import Register from "./authentication/Register";

import { Provider } from "react-redux";
import store from "../stores/configureStore";
import { loadUser } from "./../actions/auth";

import PrivateRoute from "../common/PrivateRoute";

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
    loaded: false,
    placeholder: "Loading",
  };
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router exact basename="/namecode">
          <div
            style={{
              background: "linear-gradient(to left,indianred, dodgerblue)",
              minHeight: "140vh",
            }}
          >
            <GameAppBar />
            <Container maxWidth="lg">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <PrivateRoute
                  exact
                  path="/game/:id"
                  component={Game}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/lobby"
                  component={Lobby}
                ></PrivateRoute>
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
