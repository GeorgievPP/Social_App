import { Pagination, styled, Paper, Typography } from "@mui/material";

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
  backgroundColor: "black",
  textAlign: "center",
});

export const FooterTextStyled = styled("div")({
  color: "#68bca2",
  letterSpacing: "1px",
  

});

export const FooterTextAStyled = styled(Typography)({
  color: "#e2f0ec",
});