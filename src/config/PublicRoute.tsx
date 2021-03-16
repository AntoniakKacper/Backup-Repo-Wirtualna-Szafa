import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../store";

interface PublicRouteProps extends RouteProps {
  component: any;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};
