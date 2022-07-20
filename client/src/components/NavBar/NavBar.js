import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

// MATERIAL UI
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";

// STYLES
import useStyles from "./styles";

// IMAGES
import memoriesLogo from "../../images/memoriesLogo.png";
// import memoriesText from "../../images/memoriesText.png";
import logoBack from "../../images/logoBack.png"
import logoE from "../../images/logoE.png"

const NavBar = () => {
  // USE STYLES
  const classes = useStyles();

  // GET USER FROM LOCAL STORAGE
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // USE REDUX
  const dispatch = useDispatch();

  // USE HISTORY .......... CHANGE IT
  const navigate = useNavigate();
  const location = useLocation();

  // LOGOUT HANDLER
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");

    setUser(null);
  };

  // FETCH DATA
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        {/* <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography> */}
        <img src={logoBack} alt="icon" height="65px" width="150rem" />
        <img
          className={classes.image}
          src={logoE}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
