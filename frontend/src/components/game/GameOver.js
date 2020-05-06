import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function GameOver(props) {
  const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  if (
    (props.status === "O" || props.status === "R" || props.status === "B") &&
    !opened
  ) {
    setOpen(true);
    setOpened(true);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"La partie est fini"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GameOver;
