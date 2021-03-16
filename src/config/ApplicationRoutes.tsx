import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ForgotPassword } from "../components/pages/auth/ForgotPassword";
import { Login } from "../components/pages/auth/Login";
import { Register } from "../components/pages/auth/Register";
import { Home } from "../components/pages/Home/Home";
import firebase from "../database/firebase";
import { RootState } from "../store";
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from "../store/actions/authActions";
import GlobalStyle from "../styles/GlobalStyle";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { theme } from "./theme";

export const ApplicationRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <PublicRoute path="/" exact component={Login} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/forgotPassword" component={ForgotPassword} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
