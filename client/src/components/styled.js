import { Pagination, styled, Paper, Card, Typography } from "@mui/material";

export const PaginationStyled = styled(Pagination)({
  ul: {
    display: "flex",
    justifyContent: "space-around",
  },
});

// FOOTER
export const FooterStyled = styled(Paper)({
  marginTop: 25,
  width: "100%",
  backgroundColor: "black", // #121212
  textAlign: "center",
});

export const FooterTextStyled = styled("div")({
  color: "#68bca2",
  letterSpacing: "1px",
  

});

export const FooterTextAStyled = styled(Typography)({
  color: "#e2f0ec",
});

// PostEmail

export const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "300px",
  position: "relative",
});