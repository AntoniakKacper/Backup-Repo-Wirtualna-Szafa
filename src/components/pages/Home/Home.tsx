import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { signout } from "../../../store/actions/authActions";
import { Header } from "../../Header";

interface HomePageState {}
export const Home: React.FC<HomePageState> = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <Avatar />
      <h1>Homepage</h1> {user?.username}
      <Button
        onClick={() => dispatch(signout())}
        color="secondary"
        variant="contained"
      >
        Logout
      </Button>
    </div>
  );
};
