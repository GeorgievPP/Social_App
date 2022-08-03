import {
  Card,
  CardActions,
  styled,
} from "@mui/material";

export const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "100%",
  position: "relative",
});

export const StyledCardActions = styled(CardActions)({
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
});

export const CreatorActions = styled("div")({
  display: "flex",
  flexDirection: "column",
});