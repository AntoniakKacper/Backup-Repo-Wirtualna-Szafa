import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//eslint-disable-next-line
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
import { TopLinearProgress } from "styles/LinearProgress";
import Header from "components/elements/Header";

const BottomNavbar = lazy(() => import("components/elements/BottomNavbar"));
const Add = lazy(() => import("pages/Add/AddMenu"));
const AddedClothesList = lazy(
  () => import("pages/Add/Clothes/AddedClothesList")
);
const AddedClothItem = lazy(() => import("pages/Add/Clothes/AddedClothItem"));
const AddOutfits = lazy(() => import("pages/Add/Outfits/AddOutfits"));
const ForgotPassword = lazy(() => import("pages/auth/ForgotPassword"));
const Login = lazy(() => import("pages/auth/Login"));
const Register = lazy(() => import("pages/auth/Register"));
const CalendarPage = lazy(() => import("pages/Calendar/CalendarPage"));
const Home = lazy(() => import("pages/Home/Home"));
const DisplayClothes = lazy(
  () => import("pages/Wardrobe/Clothes/DisplayClothes")
);

const DisplayOutfits = lazy(
  () => import("pages/Wardrobe/Outfits/DisplayOutfits")
);
const Wardrobe = lazy(() => import("pages/Wardrobe/Wardrobe"));
const Weather = lazy(() => import("pages/Weather/Weather"));

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
    return <TopLinearProgress color="secondary" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<TopLinearProgress color="secondary" />}>
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
