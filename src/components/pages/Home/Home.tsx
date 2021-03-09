import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { auth, database } from "../../../database/firebase";
import { Header } from "../../Header";

export const Home: React.FC = () => {
  const [userName, setUserName] = useState("default");

  useEffect(() => {
    auth.currentUser! &&
      database
        .collection("Users")
        .doc(auth.currentUser!.uid)
        .get()
        .then((userCredentials) => {
          const user = userCredentials.data();
          user && setUserName(user["username"]);
        })
        .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header />
      <Avatar />
      <h1>Homepage</h1> {userName}
      <Button
        onClick={() => auth.signOut()}
        color="secondary"
        variant="contained"
      >
        Logout
      </Button>
    </div>
  );
};
