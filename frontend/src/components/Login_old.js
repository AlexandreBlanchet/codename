import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [test, setTest] = useState('temp')

	const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    const axios = require('axios');

      // Make a request for a user with a given ID
      axios.get('/api/games')
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
  };

  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <TextField required id="username-input" label="Username" autoComplete="username" />
        <TextField
          required
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        Primary
      </Button>
    </form>
  );
}
