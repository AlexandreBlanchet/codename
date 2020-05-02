import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
  },
}));

function GameAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    props.dispatch(logout());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const authLinks = (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );

  const guestLinks = (
    <>
      <Link to="/login" className={classes.link}>
        <Button color="inherit">Login</Button>
      </Link>
      <Link to="/register" className={classes.link}>
        <Button color="inherit">Register</Button>
      </Link>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Codename
          </Typography>
          <Typography variant="h6">
            {props.user ? props.user.username : ""}
          </Typography>
          {props.isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
})(GameAppBar);
