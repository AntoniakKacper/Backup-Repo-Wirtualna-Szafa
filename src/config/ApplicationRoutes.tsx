import React from 'react'

import GlobalStyle from "../styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login/Login";
import { Register } from "../components/pages/Register/Register";
import { ForgotPassword } from "../components/pages/ForgotPassword/ForgotPassword";
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
}