import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import "typeface-roboto";
import * as actions from "../../actions/auth";
import { actionTypes as types } from "../../constants";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  form: {
    "& > *": {
      margin: theme.spacing(2),
      width: "40ch",
    },
  },
  title: {
    textAlign: "center",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(actions.login(username, password));
  };

  const resetErrors = (e) => {
    if (props.errorMsg.data) {
      props.dispatch({ type: types.REMOVE_ERROR_MESSAGE });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/lobby" />;
  }

  if (props.errorMsg.data && props.errorMsg.type == types.RESPONSE_LOGIN_FAIL) {
    const data = props.errorMsg.data;
    if (data.non_field_errors) {
      var alert = (
        <Alert severity="error">{data.non_field_errors.join()}</Alert>
      );
    }
  }
  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h4">
        Login
      </Typography>
      {alert}
      <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          autoFocus
          required
          id="username-input"
          label="Username"
          autoComplete="username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onClick={resetErrors}
        />
        <TextField
          required
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={resetErrors}
        />
        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
        <Typography>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </form>
    </Card>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errorMsg: state.auth.errorMsg,
  };
})(Login);
