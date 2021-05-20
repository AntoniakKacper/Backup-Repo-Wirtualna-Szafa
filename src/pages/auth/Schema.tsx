import * as Yup from "yup";

export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const credentialValidator = {
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(REGEX_PASSWORD, "Password does not meet requirements."),
};

export const SigninSchema = Yup.object().shape(credentialValidator);

export const SignupSchema = Yup.object().shape({
  ...credentialValidator,
  username: Yup.string().required("Required"),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(REGEX_PASSWORD, "Password does not meet requirements."),
});
