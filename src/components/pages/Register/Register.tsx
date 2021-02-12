import React, { useContext, useState } from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { styled } from "../../../config/theme";
import firebase, { auth, database } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
//import Button from "../../elements/Button";
import Links from "../../elements/Links";
import { Header } from "../../Header";
import { SignUpForm } from "../../elements/SignUpForm";

//Styled components
const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export const Register = () => {
  const authContext = useContext(AuthContext);

  const [values, setValues] = useState<RegisterFormValues>({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const history = useHistory();

  const handleChange = (event: any) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event?.preventDefault();
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
          .catch((error) => console.log(error.message));
      });
  };

  return (
    <>
      <Header />
      <Wrapper>
        <SignUpForm
          onSubmit={({ email, password }) => {
            console.log(email, password);
          }}
        />

        <Links>
          <Link to="/login">Back to login</Link>
        </Links>
      </Wrapper>
    </>
  );
};
