import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, database } from "../../../database/firebase";

export const Home: React.FC = () => {
  const [userName, setUserName] = useState();

  const history = useHistory();

  useEffect(() => { 
    database.collection("Users").doc(auth.currentUser!.uid).get().then(userCredentials => {
      const user = userCredentials.data();
      user && setUserName(user['username']);
    })
}, []);

    const handleClick = (event: any) => {
        event.preventDefault();
        auth
        .signOut()
        .then(() => {
            history.push("/login");
        })
    }

  return <div><h1>Homepage</h1> {userName}
    <button onClick={handleClick}>Logout</button>
  </div>;
};
