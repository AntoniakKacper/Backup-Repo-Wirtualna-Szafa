import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Links from "components/elements/Links";
import { FormikInput } from "components/shared/FormikInput";
import { database } from "database/firebase";
import { Formik } from "formik";
import { SignUpFormValues } from "models/auth.model";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
//eslint-disable-next-line
import { Link } from "react-router-dom";
import { RootState } from "store";
import { setError, signup } from "store/actions/authActions";
import { SignupSchema } from "./Schema";
import { AuthActions, AuthForm, AuthWrapper } from "./styles/authStyles";

const Register: React.FC = () => {
  const action = useDispatch();
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state: RootState) => state.auth);
  const [users] = useCollection(database.collection("Users"));

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
    }
  };

  return (
    <AuthWrapper>
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
          <AuthForm>
            <FormikInput name="username" label="Username" variant="standard" />
            <FormikInput name="email" label="Email" variant="standard" />
            <FormikInput
              name="password"
              label="Password"
              variant="standard"
              passwordDecoration={true}
            />
            <FormikInput
              name="confirmedPassword"
              label="Confirm password"
              variant="standard"
              passwordDecoration={true}
            />
            <AuthActions>
              {loading ? (
                <Button variant="outlined" color="secondary" disabled>
                  <CircularProgress color="secondary" size={20} />
                </Button>
              ) : (
                <Button variant="outlined" color="secondary" type="submit">
                  Sign up
                </Button>
              )}
            </AuthActions>
          </AuthForm>
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
    </AuthWrapper>
  );
};

export default Register;
