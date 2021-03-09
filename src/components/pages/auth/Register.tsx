import { Formik } from "formik";
import React, { useContext, useState } from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { styled } from "../../../config/theme";
import firebase, { auth, database } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
import Links from "../../elements/Links";
import { MyField } from "../../elements/MyField";
import { Header } from "../../Header";
import { RegisterFormValues } from "../../../models/auth.model";
import { SignupSchema } from "./Schema";
import { StyledButton, StyledForm } from "../../styledComponents/AuthStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useCollection } from "react-firebase-hooks/firestore";

//Styled components
const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

export const Register: React.FC = () => {
  const authContext = useContext(AuthContext);

  //const [exists, setExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [users] = useCollection(database.collection("Users"));

  const history = useHistory();

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkIfUsernameExists = (values: RegisterFormValues) => {
    return users?.docs.find((user) => user.data().username === values.username)
      ?.exists;
  };

  const handleSubmit = (values: RegisterFormValues) => {
    if (checkIfUsernameExists(values)) {
      setErrorMessage("This username is already taken");
      setOpen(true);
    } else {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential: firebase.auth.UserCredential) => {
          authContext.setCurrentUser(userCredential);
          const db = database;
          db.collection("Users")
            .doc(userCredential.user!.uid)
            .set({
              email: values.email,
              username: values.username,
            })
            .then(() => {
              history.push("/home");
              console.log("Zalogowano");
            })
            .catch((error) => {
              setErrorMessage(error.message);
              setOpen(true);
            });
        })
        .catch((error: firebase.auth.Error) => {
          setErrorMessage(error.message);
          setOpen(true);
        });
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmedPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {() => (
            <StyledForm>
              <MyField name="username" placeholder="Username"></MyField>
              <MyField name="email" placeholder="Email"></MyField>
              <MyField
                name="password"
                placeholder="Password"
                passwordDecoration={true}
              />
              <MyField
                name="confirmedPassword"
                placeholder="Confirm password"
                passwordDecoration={true}
              />
              <StyledButton variant="outlined" color="secondary" type="submit">
                Sign in
              </StyledButton>
            </StyledForm>
          )}
        </Formik>
        <Links>
          <Link to="/login">Back to login</Link>
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
