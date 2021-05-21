import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Links from "components/elements/Links";
import { FormikInput } from "components/shared/FormikInput";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from "react-router-dom";
import { RootState } from "store";
import { setError, signin } from "store/actions/authActions";
import { SigninSchema } from "./Schema";
import { AuthActions, AuthForm, AuthWrapper } from "./styles/authStyles";

interface SignInFormValues {
  email: string;
  password: string;
}
interface MyFormProps {
  onSubmit: (values: SignInFormValues) => void;
}

const Login: React.FC<MyFormProps> = () => {
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
    <AuthWrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {() => (
          <AuthForm>
            <FormikInput name="email" label="Email" variant="standard" />
            <FormikInput
              name="password"
              label="Password"
              passwordDecoration={true}
              variant="standard"
            />
            <AuthActions>
              {loading ? (
                <Button variant="outlined" color="secondary" disabled>
                  <CircularProgress color="secondary" size={20} />
                </Button>
              ) : (
                <Button variant="outlined" color="secondary" type="submit">
                  Sign in
                </Button>
              )}
            </AuthActions>
          </AuthForm>
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
    </AuthWrapper>
  );
};

export default Login;
