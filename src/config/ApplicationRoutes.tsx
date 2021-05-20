import LinearProgress from "@material-ui/core/LinearProgress";
import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import firebase from "database/firebase";
import { RootState } from "store";
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from "store/actions/authActions";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { theme } from "./theme";

const BottomNavbar = lazy(() => import("components/elements/BottomNavbar"));
const Header = lazy(() => import("components/Header"));
const Add = lazy(() => import("components/pages/Add/Add"));
const AddedClothesList = lazy(
  () => import("components/pages/Add/Clothes/AddedClothesList")
);
const AddedClothItem = lazy(
  () => import("components/pages/Add/Clothes/AddedClothItem")
);
const AddOutfits = lazy(
  () => import("components/pages/Add/Outfits/AddOutfits")
);
const ForgotPassword = lazy(
  () => import("components/pages/auth/ForgotPassword")
);
const Login = lazy(() => import("components/pages/auth/Login"));
const Register = lazy(() => import("components/pages/auth/Register"));
const CalendarPage = lazy(
  () => import("components/pages/Calendar/CalendarPage")
);
const Home = lazy(() => import("components/pages/Home/Home"));
const DisplayClothes = lazy(
  () => import("components/pages/Wardrobe/Clothes/DisplayClothes")
);
const ItemsList = lazy(
  () => import("components/pages/Wardrobe/Clothes/ItemsList")
);
const DisplayOutfits = lazy(
  () => import("components/pages/Wardrobe/Outfits/DisplayOutfits")
);
const Wardrobe = lazy(() => import("components/pages/Wardrobe/Wardrobe"));
const Weather = lazy(() => import("components/pages/Weather/Weather"));

const ApplicationRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        dispatch(getUserById(user.uid));
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
      <Suspense fallback={<div>Loading...</div>}>
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
            <PrivateRoute path="/weather" component={Weather} />
          </Switch>

          {authenticated && <BottomNavbar />}
        </Router>
      </Suspense>
    </ThemeProvider>
  );
};

export default ApplicationRoutes;
