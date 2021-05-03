import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { Add } from "../components/pages/Add/Add";
import { AddItemDialog } from "../components/pages/Add/Clothes/Dialog/AddItemDialog";
import { AddedClothesList } from "../components/pages/Add/Clothes/AddedClothesList";
import { ForgotPassword } from "../components/pages/auth/ForgotPassword";
import { Login } from "../components/pages/auth/Login";
import { Register } from "../components/pages/auth/Register";
import { CalendarPage } from "../components/pages/Calendar/CalendarPage";
import { Home } from "../components/pages/Home/Home";
import { Profile } from "../components/pages/Home/Profile";
import { Categories } from "../components/pages/Wardrobe/Clothes/Categories";
import { ItemsList } from "../components/pages/Wardrobe/Clothes/ItemsList";
import { Wardrobe } from "../components/pages/Wardrobe/Wardrobe";
import firebase from "../database/firebase";
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from "../store/actions/authActions";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const ApplicationRoutes: React.FC = () => {
  const dispatch = useDispatch();

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

  return (
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
      <PrivateRoute path="/addClothes" component={AddedClothesList} />
      <PrivateRoute path="/addItem" component={AddItemDialog} />

      <PrivateRoute path="/calendar" component={CalendarPage} />

      <PrivateRoute path="/profile" component={Profile} />
    </Switch>
  );
};
