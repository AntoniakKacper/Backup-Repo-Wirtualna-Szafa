import { Formik, useFormikContext } from "formik";
import React, { useContext, useEffect, useState } from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { styled } from "../../../config/theme";
import firebase, { auth, database } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
import Links from "../../elements/Links";
import { MyField } from "../../elements/MyField";
import { Header } from "../../Header";
import { RegisterFormValues } from "../../../models/auth.model";
import { SignupSchema } from "../../pages/authentication/Schema";
import { StyledButton, StyledForm } from "../../styledComponents/AuthStyles";

//Styled components
const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

export const Register: React.FC = () => {
  const authContext = useContext(AuthContext);

  const history = useHistory();

  //Zrobic z tego sprawdzanie na biezaco bez klikania
  const checkIfUsernameExists = (values: RegisterFormValues) => {
    const db = database;
    return db
      .collection("Users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => doc.data().username === values.username);
      });
  };

  const handleSubmit = (values: RegisterFormValues) => {
    !checkIfUsernameExists(values) &&
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential: firebase.auth.UserCredential) => {
          authContext.setCurrentUser(userCredential);
          const db = database;
          db.collection("Users")
            .doc(userCredential.user!.uid)
            .set({
              email: values.email,
              username: values.username,
            })
            .then(() => {
              history.push("/home");
              console.log("Gitara bangla");
            })
            .catch((error) => console.log(error));
        });
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmedPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {() => (
            <StyledForm>
              <MyField name="username" placeholder="Username"></MyField>
              <MyField name="email" placeholder="Email"></MyField>
              <MyField
                name="password"
                placeholder="Password"
                passwordDecoration={true}
              />
              <MyField
                name="confirmedPassword"
                placeholder="Confirm password"
                passwordDecoration={true}
              />
              <StyledButton variant="outlined" color="secondary" type="submit">
                Sign in
              </StyledButton>
            </StyledForm>
          )}
        </Formik>
        <Links>
          <Link to="/login">Back to login</Link>
        </Links>
      </Wrapper>
    </>
  );
};
