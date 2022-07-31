import { AUTH } from "../constants/actionType";
import * as api from "../api";
import { getError } from "../utils";

export const login = (formData, navigate, setAlert, setAlertInfo) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (err) {
    // console.log(err);
    setAlert(true)
    console.log(getError(err));
    setAlertInfo(getError(err));
  }
};

export const register = (formData, navigate, setErrors) => async (dispatch) => {
  try {

    if (!registerValidation(formData, setErrors)) {
      return;
    }

    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (err) {
    console.log(err);
  }
};



// REGISTER VALIDATION
const registerValidation = (formData, setErrors) => {
  let temp = {};
  temp.firstName =
    formData.firstName.length > 3
      ? ""
      : "First Name Length must be at least 3 chars";
  temp.lastName =
    formData.lastName.length > 3
      ? ""
      : "Last Name Length must be at least 3 chars";
  temp.email =
    formData.email.length > 3 ? "" : "Email Length must be at least 3 chars";
  temp.password =
    formData.password.length > 4
      ? ""
      : "Password Length must be at least 4 chars";
  temp.confirmPassword =
    formData.password === formData.confirmPassword
      ? ""
      : "Passwords do not match";

  setErrors({
    ...temp,
  });

  return Object.values(temp).every((x) => x == "");
};

