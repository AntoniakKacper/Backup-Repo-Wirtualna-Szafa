//import Button from "../../elements/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { styled } from "../../../config/theme";
import firebase, { auth, database } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
import Links from "../../elements/Links";
import { SigninSchema } from "../../pages/authentication/Schema";
import { Header } from "../../Header";
import { StyledButton, StyledForm } from "../../styledComponents/AuthStyles";
import { MyField } from "../../elements/MyField";

interface SignInFormValues {
  email: string;
  password: string;
}
interface MyFormProps {
  onSubmit: (values: SignInFormValues) => void;
}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

export const Login: React.FC<MyFormProps> = () => {
  const authContext = useContext(AuthContext);
  const { loadingAuthState } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (values: SignInFormValues) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredentials: firebase.auth.UserCredential) => {
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
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {() => (
            <StyledForm>
              <MyField name="email" placeholder="Email"></MyField>
              <MyField
                name="password"
                placeholder="Password"
                passwordDecoration={true}
              />
              <StyledButton variant="outlined" color="secondary" type="submit">
                Sign in
              </StyledButton>
            </StyledForm>
          )}
        </Formik>
        <Links>
          <Link to="/register">Register</Link>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </Links>
      </Wrapper>
    </>
  );
};
