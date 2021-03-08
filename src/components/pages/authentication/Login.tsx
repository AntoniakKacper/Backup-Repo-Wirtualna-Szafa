//import Button from "../../elements/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { styled } from "../../../config/theme";
import firebase, { auth, database } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
import Links from "../../elements/Links";
import { SigninSchema } from "../../pages/authentication/Schema";
import { Header } from "../../Header";
import { StyledButton, StyledForm } from "../../styledComponents/AuthStyles";
import { MyField } from "../../elements/MyField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

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
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredentials: firebase.auth.UserCredential) => {
        authContext.setCurrentUser(userCredentials);
        //localStorage.setItem("user", userCredentials);
        history.push("/home");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setOpen(true);
      });
  };

  useEffect(() => {
    auth.getRedirectResult().then((result) => {
      if (!result || !result.user || !auth.currentUser) {
        return;
      }

      return setUserProfile()
        .then(() => {
          history.push("/home");
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setOpen(true);
        });
    });
  }, []);

  const setUserProfile = async () => {
    if (await isUserExisits()) {
      return;
    }

    const user = auth.currentUser!;
    console.log(user);
    database
      .collection("Users")
      .doc(user.uid)
      .set({
        username: user.displayName,
      })
      .then(() => {
        console.log("Username saved");
        return;
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setOpen(true);
      });
  };

  const isUserExisits = async () => {
    const doc = await database
      .collection("Users")
      .doc(auth.currentUser!.uid)
      .get();
    return doc.exists;
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
