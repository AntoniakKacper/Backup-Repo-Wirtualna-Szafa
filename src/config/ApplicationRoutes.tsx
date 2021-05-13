import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { BottomNavbar } from "../components/elements/BottomNavbar";
import { Header } from "../components/Header";
import { Add } from "../components/pages/Add/Add";
import { AddedClothesList } from "../components/pages/Add/Clothes/AddedClothesList";
import { AddedClothItem } from "../components/pages/Add/Clothes/AddedClothItem";
import { AddOutfits } from "../components/pages/Add/Outfits/AddOutfits";
import { ForgotPassword } from "../components/pages/auth/ForgotPassword";
import { Login } from "../components/pages/auth/Login";
import { Register } from "../components/pages/auth/Register";
import { CalendarPage } from "../components/pages/Calendar/CalendarPage";
import { Home } from "../components/pages/Home/Home";
import { Profile } from "../components/pages/Home/Profile";
import { DisplayClothes } from "../components/pages/Wardrobe/Clothes/DisplayClothes";
import { ItemsList } from "../components/pages/Wardrobe/Clothes/ItemsList";
import { DisplayOutfits } from "../components/pages/Wardrobe/Outfits/DisplayOutfits";
import { Wardrobe } from "../components/pages/Wardrobe/Wardrobe";
import { Weather } from "../components/pages/Weather/Weather";
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

      <Router>
        <Header />
        <Switch>
          <PublicRoute path="/" exact component={Login} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/forgotPassword" component={ForgotPassword} />

          <PrivateRoute path="/home" component={Home} />

          <PrivateRoute path="/wardrobe" component={Wardrobe} />
          <PrivateRoute path="/myClothes" component={DisplayClothes} />
          <PrivateRoute path="/myOutfits" component={DisplayOutfits} />
          <PrivateRoute path="/itemsList/:category" component={ItemsList} />

          <PrivateRoute path="/add" component={Add} />
          <PrivateRoute path="/addClothes" component={AddedClothesList} />
          <PrivateRoute path="/addItem" component={AddedClothItem} />

          <PrivateRoute path="/addOutfits" component={AddOutfits} />

          <PrivateRoute path="/calendar" component={CalendarPage} />

          <PrivateRoute path="/profile" component={Profile} />

          <PrivateRoute path="/weather" component={Weather} />
        </Switch>
        {authenticated && <BottomNavbar />}
      </Router>
    </ThemeProvider>
  );
};
