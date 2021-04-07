import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import { styled } from "../../../config/theme";
import { RootState } from "../../../store";
import { setError, signin } from "../../../store/actions/authActions";
import { flexCenterXY } from "../../../styles/shared-style";
import Links from "../../elements/Links";
import { MyField } from "../../elements/MyField";
import { Header } from "../../Header";
import { StyledButton, StyledForm } from "../../styledComponents/AuthStyles";
import { SigninSchema } from "./Schema";

import CircularProgress from "@material-ui/core/CircularProgress";

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
  const action = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      error && action(setError(null));
    };
  }, [error, action]);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    action(setError(null));
  };

  const handleSubmit = (values: SignInFormValues) => {
    setLoading(true);
    action(signin(values, () => setLoading(false)));
    if (error) {
      action(setError(error));
    }
  };

  return (
    <>
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
                  Sign in
                </StyledButton>
              )}
            </StyledForm>
          )}
        </Formik>
        <Links>
          <Link to="/register">Register</Link>
          <Link to="/forgotPassword">Forgot Password?</Link>
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
