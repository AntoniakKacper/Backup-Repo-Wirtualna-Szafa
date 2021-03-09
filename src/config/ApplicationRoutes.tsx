import React from "react";

import GlobalStyle from "../styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/auth/Login";
import { Register } from "../components/pages/auth/Register";
import { ForgotPassword } from "../components/pages/auth/ForgotPassword";
import { Home } from "../components/pages/Home/Home";
import { PrivateRoute } from "./PrivateRoute";

export const ApplicationRoutes: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
