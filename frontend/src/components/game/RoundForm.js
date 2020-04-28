import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { submitWord } from "../../actions/game";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
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
  const [number, setNumber] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(submitWord(word, number));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Choose a word and the number of tiles to play with
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.elems}>
            <TextField
              required
              id="outlined-full-width"
              label="Word"
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
              min={1}
              max={8}
              onChange={(event, newValue) => setNumber(newValue)}
            />
          </div>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default connect()(RoundForm);
