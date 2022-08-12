import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
// MATERIAL UI
import {
  Avatar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
// Styled Comp
import {
  StyledAppBar,
  StyledToolbar,
  StyledHeading,
  ProfileDiv,
} from "./styled";
import { Store } from "../../Store";
// IMAGES
import logoE from "../../images/logoE.png";

import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import FaceIcon from '@mui/icons-material/Face';

const NavBar = () => {
  // USE CONTEXT
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { authData } = state;
  const user = authData;
  // USE NAVIGATE
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // USE EFFECT
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location]);

  const handleMyPosts = () => {
    handleClose();
    navigate("/posts/email")
  }

  // LOGOUT HANDLER
  const logout = () => {
    ctxDispatch({ type: "LOGOUT" });
    handleClose();
    navigate("/");
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
              <Avatar
                style={{ marginLeft: "270px" }}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              {/* <Typography variant="h6">{user.result.name}</Typography> */}
              <Button
                variant="contained"
                color="secondary"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {user.result.name.split(" ")[0]}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                  // "disablesripple": "true",
                }}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={handleMyPosts}><AccountCircleIcon style={{marginRight: "5px"}} /> My account</MenuItem>
                <MenuItem onClick={logout}><LogoutIcon style={{marginRight: "5px"}} /> Logout</MenuItem>
              </Menu>
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
