import { Paper, AppBar, styled, Box } from "@mui/material";

export const AppBarSearch = styled(AppBar)({
  borderRadius: 4,
  marginBottom: "1rem",
  display: "flex",
  padding: "16px",
});

export const PaperPagination = styled(Paper)({
  borderRadius: 4,
  marginTop: "1rem",
  padding: "16px",
});

export const PaperStyled = styled(Paper)({
  borderRadius: 4,
  marginTop: "1rem",
  padding: "10px",
  display: "flex",
  justifyContent: "center"
});
// export const 

export const BoxPop = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
})