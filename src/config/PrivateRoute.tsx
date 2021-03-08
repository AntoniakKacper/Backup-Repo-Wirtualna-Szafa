import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...rest }) => {
  const auth = useContext(AuthContext);
  if (auth.currentUser! === null) {
    return <Redirect to="/" />;
  }
  return <Route {...rest} />;
};
