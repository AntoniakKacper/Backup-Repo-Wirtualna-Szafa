import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, database } from "../../../database/firebase";
import { Header } from "../../Header";
import Button from "@material-ui/core/Button";

export const Home: React.FC = () => {
  const [userName, setUserName] = useState();

  const history = useHistory();

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

  const handleClick = (event: any) => {
    event.preventDefault();
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div>
      <Header />
      <h1>Homepage</h1> {userName}
      <Button onClick={handleClick} color="secondary" variant="contained">
        Logout
      </Button>
    </div>
  );
};
