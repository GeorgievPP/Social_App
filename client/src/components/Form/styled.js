import { Button, Paper, styled, TextField } from "@mui/material";

export const PaperStyled = styled(Paper)({
  padding: 8,
});

export const FormStyled = styled("form")({
  margin: 4,
  paddingBottom: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

export const TextFieldStyled = styled(TextField)({
  marginBottom: 10,
});

export const FileDivStyled = styled("div")({
  width: "97%",
  margin: "10px 0",
});

export const ButtonSubmit = styled(Button)({
  marginBottom: 10,
  color: "2196f3"
})

export const ButtonClear = styled(Button)({
  // color: "#9500ae"
})