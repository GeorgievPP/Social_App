// MATERIAL UI
import { Toolbar, Typography, styled, AppBar } from "@mui/material";

export const StyledAppBar = styled(AppBar)({
  position:"sticky",
  margin: "15px 0",
  borderRadius: "15px",
  paddingRight: "0 !important"
  // backgroundColor: "green"
});

export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export const StyledHeading = styled(Typography)({
  margin: 5,
  textDecoration: "none",
  fontSize: "2em",
  color: "white",
});

export const ProfileDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "400px",
  alignItems: "center",
});
