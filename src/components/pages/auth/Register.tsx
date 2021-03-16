import { Formik } from "formik";
import React, { useState } from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { styled } from "../../../config/theme";
import { database } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
import Links from "../../elements/Links";
import { MyField } from "../../elements/MyField";
import { Header } from "../../Header";
import { SignUpFormValues } from "../../../models/auth.model";
import { SignupSchema } from "./Schema";
import { StyledButton, StyledForm } from "../../styledComponents/AuthStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useCollection } from "react-firebase-hooks/firestore";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../store/actions/authActions";
import { RootState } from "../../../store";

//Styled components
const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

export const Register: React.FC = () => {
  const action = useDispatch();
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state: RootState) => state.auth);
  const { authenticated } = useSelector((state: RootState) => state.auth);

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

  const checkIfUsernameExists = (values: SignUpFormValues) => {
    return users?.docs.find((user) => user.data().username === values.username)
      ?.exists;
  };

  const handleSubmit = (values: SignUpFormValues) => {
    if (checkIfUsernameExists(values)) {
      setErrorMessage("This username is already taken");
      //dispatch(setError());
      setOpen(true);
    } else {
      setLoading(true);
      history.push("/home");
      action(signup(values, () => setLoading(false)));
      console.log(authenticated);
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
