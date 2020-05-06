import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { submitWord } from "../../actions/game";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    marginTop: "20px",
  },
  elems: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
}));

const CustomSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
    top: 4,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
})(Slider);

function RoundForm(props) {
  const classes = useStyles();
  const [word, setWord] = useState("");
  const [number, setNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (number > 0) props.dispatch(submitWord(word, number));
    else setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Vous devez renseigner un nombre de cartes à trouver pour ce mot.
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Choisissez un mot et le nombre de cartes qu'il permet de trouver.
          </Typography>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.elems}>
              <TextField
                required
                id="outlined-full-width"
                label="Mot à proposer"
                value={word}
                onChange={(event) => setWord(event.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <CustomSlider
                value={number}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="on"
                min={0}
                max={9}
                onChange={(event, newValue) => setNumber(newValue)}
              />
            </div>
            <Button color="primary" variant="contained" type="submit">
              Proposer ce mot
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default connect()(RoundForm);
