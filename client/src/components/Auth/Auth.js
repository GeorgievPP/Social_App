import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// MATERIAL UI
import {
  Button,
  Grid,
  Typography,
  Container,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
// STYLED COMP
import {
  AvatarStyled,
  ButtonSubmitStyled,
  FormDivStyled,
  PaperStyled,
} from "./styles";

// COMPONENTS
import Input from "./Input";

// ACTIONS
import { login, register } from "../../actions/auth";

// INITIAL STATE
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// LOGIN AND REGISTER COMPONENT
function Auth() {
  // USE STATE
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState("");

  // USE REDUX
  const dispatch = useDispatch();
  // USE NAVIGATE
  const navigate = useNavigate();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  // FORM SUBMIT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (isSignup) {
      dispatch(register(formData, navigate, setErrors));
    } else {
      dispatch(login(formData, navigate, setAlert, setAlertInfo));
    }
  };

  // GETTING FORM DATA
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // TOGGLE LOGIN OR REGISTER
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setAlert(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <PaperStyled elevation={3}>
        <AvatarStyled>
          <LockOpenIcon />
        </AvatarStyled>
        {alert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error" onClose={() => setAlert(false)}>
              <AlertTitle>Error</AlertTitle>
              Invalid Credentials - <strong>{alertInfo}</strong>
            </Alert>
          </Stack>
        )}
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sing In"}</Typography>
        <FormDivStyled onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  error={errors.firstName}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  error={errors.lastName}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              error={errors.email}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              error={errors.password}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                error={errors.confirmPassword}
                type="password"
              />
            )}
          </Grid>

          <ButtonSubmitStyled
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sing In"}
          </ButtonSubmitStyled>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Dont have an account? Sign UP"}
              </Button>
            </Grid>
          </Grid>
        </FormDivStyled>
      </PaperStyled>
    </Container>
  );
}

export default Auth;
