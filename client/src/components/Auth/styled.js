// import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Paper, styled } from "@mui/material";

export const PaperStyled = styled(Paper)({
  marginTop: "32px",
  padding: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const AvatarStyled = styled(Avatar)({
  margin: "4px",
  backgroundColor: "#1de9b6",
});

export const FormDivStyled = styled("form")({
  width: "100%",
  marginTop: "20px",
});

export const ButtonSubmitStyled = styled(Button)({
  margin: "20px 0",
});

export const FileDivStyled = styled("div")({
  width: "97%",
  marginLeft: "20px",
  marginTop: "15px"

  // margin: "10px 0",
});

export const ButtonToggleStyled = styled(Button)({
  marginLeft: "114px",
  marginTop: "15px"
})


// export default makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: theme.spacing(2),
//   },
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//     },
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   googleButton: {
//     marginBottom: theme.spacing(2),
//   },
// }));
