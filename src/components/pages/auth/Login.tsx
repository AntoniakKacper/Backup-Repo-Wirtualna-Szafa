import LinearProgress from "@material-ui/core/LinearProgress";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { styled } from "../../../config/theme";
import firebase, { auth } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
import Links from "../../elements/Links";
import { SigninSchema } from "./Schema";
import { Header } from "../../Header";
import { StyledButton, StyledForm } from "../../styledComponents/AuthStyles";
import { MyField } from "../../elements/MyField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import LogRocket from "logrocket";

interface SignInFormValues {
  email: string;
  password: string;
}
interface MyFormProps {
  onSubmit: (values: SignInFormValues) => void;
}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

export const Login: React.FC<MyFormProps> = () => {
  const authContext = useContext(AuthContext);
  const { loadingAuthState } = useContext(AuthContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (values: SignInFormValues) => {
    LogRocket.init("nuvkai/wirtualna-szafa");
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredentials: firebase.auth.UserCredential) => {
        authContext.setCurrentUser(userCredentials);
        localStorage.setItem(
          "token",
          JSON.stringify(userCredentials.user?.refreshToken)
        );
        history.push("/home");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setOpen(true);
      });
  };

  if (loadingAuthState) {
    return (
      <div>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Wrapper>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {() => (
            <StyledForm>
              <MyField name="email" placeholder="Email"></MyField>
              <MyField
                name="password"
                placeholder="Password"
                passwordDecoration={true}
              />
              <StyledButton variant="outlined" color="secondary" type="submit">
                Sign in
              </StyledButton>
            </StyledForm>
          )}
        </Formik>
        <Links>
          <Link to="/register">Register</Link>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </Links>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Wrapper>
    </>
  );
};
