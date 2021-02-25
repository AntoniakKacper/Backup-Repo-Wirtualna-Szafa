import * as Yup from "yup";

export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter email"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Enter Password")
    .matches(REGEX_PASSWORD, "Password does not meet requirements."),
});

export const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Enter username"),
  email: Yup.string().email("Invalid email").required("Enter email"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Enter Password")
    .matches(REGEX_PASSWORD, "Password does not meet requirements."),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Confirm password")
    .matches(REGEX_PASSWORD, "Password does not meet requirements."),
});
