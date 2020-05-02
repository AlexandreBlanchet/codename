import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import "typeface-roboto";
import * as actions from "../../actions/auth";
import { connect } from "react-redux";
import { actionTypes as types } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    padding: "20px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
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

function Register(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [matchPassword, setMatchPassword] = useState(true);
  const [helperText, setHelperText] = useState("");

  if (props.isAuthenticated) {
    return <Redirect to="/lobby" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (matchPassword) props.dispatch(actions.register(username, password));
  };

  const handlePassword = (e) => {
    const pass = e.target.value;
    var status = true;
    if (e.target.name === "password") {
      setPassword(pass);
      if (password2 != "" && pass != password2) status = false;
    }
    if (e.target.name === "password2") {
      setPassword2(pass);
      if (pass != password) status = false;
    }

    if (status !== matchPassword) {
      setMatchPassword(status);
    }
    if (!status) setHelperText("Passwords don't match");
    else setHelperText("");
  };

  const resetErrors = (e) => {
    if (props.errorMsg.data) {
      props.dispatch({ type: types.REMOVE_ERROR_MESSAGE });
      setUsername("");
      setPassword("");
      setPassword2("");
      setMatchPassword(true);
    }
  };

  if (
    props.errorMsg.data &&
    props.errorMsg.type == types.RESPONSE_REGISTER_FAIL
  ) {
    const data = props.errorMsg.data;
    var msg = "There is an error !";
    if (data.non_field_errors) {
      msg = data.non_field_errors.join();
    }
    if (data.username) {
      msg = data.username.join();
    }
    var alert = <Alert severity="error">{msg}</Alert>;
  }

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h4">
        Register
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
          error={!matchPassword}
          id="password-input"
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={password}
          onChange={handlePassword}
          helperText={helperText}
        />
        <TextField
          required
          error={!matchPassword}
          id="password-input-retype"
          label="Confirm password"
          type="password"
          variant="outlined"
          name="password2"
          value={password2}
          onChange={handlePassword}
          helperText={helperText}
        />
        <div>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </div>
        <Typography>
          Already have an account? <Link to="/login">Login</Link>
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
})(Register);
