import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ItemsList } from "../components/pages/Wardrobe/Clothes/ItemsList";
import { BottomNavbar } from "../components/elements/BottomNavbar";
import { Header } from "../components/Header";
import { ForgotPassword } from "../components/pages/auth/ForgotPassword";
import { Login } from "../components/pages/auth/Login";
import { Register } from "../components/pages/auth/Register";
import { Wardrobe } from "../components/pages/Wardrobe/Wardrobe";
import { Home } from "../components/pages/Home/Home";
import { Favorites } from "../components/pages/Home/Favorites";
import { Profile } from "../components/pages/Home/Profile";
import { Categories } from "../components/pages/Wardrobe/Clothes/Categories";
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
import { AddClothes } from "../components/pages/Add/Clothes/AddClothes";
import { Add } from "../components/pages/Add/Add";
import { AddItem } from "../components/pages/Add/Clothes/AddItem";

export const ApplicationRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

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
      <Header />
      <Router>
        <Switch>
          <PublicRoute path="/" exact component={Login} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/forgotPassword" component={ForgotPassword} />

          <PrivateRoute path="/home" component={Home} />

          <PrivateRoute path="/wardrobe" component={Wardrobe} />
          <PrivateRoute path="/categories" component={Categories} />
          <PrivateRoute path="/itemsList/:category" component={ItemsList} />

          <PrivateRoute path="/add" component={Add} />
          <PrivateRoute path="/addClothes" component={AddClothes} />
          <PrivateRoute path="/addItem" component={AddItem} />

          <PrivateRoute path="/favorites" component={Favorites} />

          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
        {authenticated && <BottomNavbar />}
      </Router>
    </ThemeProvider>
  );
};
