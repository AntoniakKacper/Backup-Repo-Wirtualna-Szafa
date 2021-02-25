import React from "react";

import GlobalStyle from "../styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/authentication/Login";
import { Register } from "../components/pages/authentication/Register";
import { ForgotPassword } from "../components/pages/authentication/ForgotPassword";
import { Home } from "../components/pages/Home/Home";

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
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
