//import Button from "../../elements/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { styled } from "../../../config/theme";
import { auth, database } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
import Links from "../../elements/Links";
import { SignInForm } from "../../elements/SignInForm";
import { Header } from "../../Header";

interface UserData {
  email: string;
  password: string;
}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

export const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { loadingAuthState } = useContext(AuthContext);
  const history = useHistory();

  const [values, setValues] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredentials) => {
        authContext.setCurrentUser(userCredentials);
        history.push("/home");
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    auth.getRedirectResult().then((result) => {
      if (!result || !result.user || !auth.currentUser) {
        return;
      }

      return setUserProfile()
        .then(() => {
          history.push("/home");
        })
        .catch((error) => console.log(error.message));
    });
  }, []);

  const setUserProfile = async () => {
    if (await isUserExisits()) {
      return;
    }

    const user = auth.currentUser!;
    console.log(user);
    database
      .collection("Users")
      .doc(user.uid)
      .set({
        //Sprawdzic czy istnieje juz taka nazwa uzytkownika
        username: user.displayName,
      })
      .then(() => {
        console.log("Username saved");
        return;
      })
      .catch((error) => console.log(error.message));
  };

  const isUserExisits = async () => {
    const doc = await database
      .collection("Users")
      .doc(auth.currentUser!.uid)
      .get();
    return doc.exists;
  };

  if (loadingAuthState) {
    return (
      <div>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Wrapper>
        <SignInForm
          onSubmit={({ email, password }) => {
            console.log(email, password);
          }}
        />
        <Links>
          <Link to="/register">Register</Link>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </Links>
      </Wrapper>
    </>
  );
};
