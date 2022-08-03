import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
// MATERIAL UI
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
// Styled Comp
import { StyledAppBar, StyledToolbar, StyledHeading, ProfileDiv } from "./styled";
// IMAGES
import logoE from "../../images/logoE.png";

const NavBar = () => {
  // GET USER FROM LOCAL STORAGE
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // USE REDUX
  const dispatch = useDispatch();

  // USE NAVIGATE
  const navigate = useNavigate();
  const location = useLocation();

  // USE EFFECT
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

  // LOGOUT HANDLER
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  // TEMPLATE RETURN
  return (
    <StyledAppBar>
      <StyledToolbar>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img src={logoE} alt="icon" height="40px" />
          <StyledHeading variant="h2">Social App</StyledHeading>
        </Link>
        <Toolbar>
          {user ? (
            <ProfileDiv>
              <Avatar alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography variant="h6">{user.result.name}</Typography>
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </ProfileDiv>
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
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavBar;
