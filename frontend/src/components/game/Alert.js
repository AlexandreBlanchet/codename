import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function AlertMessage(props) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [props.message]);

  const handleClose = () => {
    setOpen(false);
  };

  if (props.message) {
    var AlertMessage = (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.message.type}>
          {props.message.message}
        </Alert>
      </Snackbar>
    );
  }

  return <> {AlertMessage} </>;
}

export default connect(function mapStateToProps(state) {
  return {
    message: state.game.message,
  };
})(AlertMessage);
