import { Formik } from "formik";
import React, { useEffect, useState } from "react";
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
import { setError, signup } from "../../../store/actions/authActions";
import { RootState } from "../../../store";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const [users] = useCollection(database.collection("Users"));

  const history = useHistory();

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  useEffect(() => {
    return () => {
      error && setError(null);
    };
  }, [error, action]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    action(setError(null));
  };

  const checkIfUsernameExists = (values: SignUpFormValues) => {
    return users?.docs.find((user) => user.data().username === values.username)
      ?.exists;
  };

  const handleSubmit = (values: SignUpFormValues) => {
    error && action(setError(error));
    if (checkIfUsernameExists(values)) {
      action(setError("This username is already taken"));
    } else {
      setLoading(true);
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
              {loading ? (
                <StyledButton variant="outlined" color="secondary" disabled>
                  <CircularProgress color="secondary" size={20} />
                </StyledButton>
              ) : (
                <StyledButton
                  variant="outlined"
                  color="secondary"
                  type="submit"
                >
                  Sign up
                </StyledButton>
              )}
            </StyledForm>
          )}
        </Formik>
        <Links>
          <Link to="/login">Back to login</Link>
        </Links>
        <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Wrapper>
    </>
  );
};
