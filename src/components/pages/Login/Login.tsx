import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import { AuthContext } from "../../../AuthProvider";

import { styled } from '../../../config/theme';
import { makeStyles } from "@material-ui/core/styles";

import { BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Header } from "../../Header";

import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "../../elements/Button";
import Links from "../../elements/Links";

import { flexCenterXY } from "../../../styles/shared-style";
import { auth, database } from "../../../database/firebase";

interface UserData {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

const Form = styled.form`
  ${flexCenterXY}
  width: 100%;
  flex-direction: column;
  padding-top: 150px;
  padding-bottom: 100px;
`;

export const Login: React.FC = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const {loadingAuthState} = useContext(AuthContext);
  const history = useHistory();


  const [values, setValues] = useState<UserData>({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (event: any) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(values.email, values.password).then((userCredentials) => {
      authContext.setCurrentUser(userCredentials);
      history.push("/home");
    }).catch((error) => console.log(error.message));
  }

  useEffect(() => {
    auth.getRedirectResult().then((result) => {
      if(!result || !result.user || !auth.currentUser){
        return;
      }

      return setUserProfile().then(() => {
        history.push("/home");
      }).catch((error) => console.log(error.message))
    })
  }, [])

  const setUserProfile = async () => {
    if(await isUserExisits()){
      return ;
    }

    const user = auth.currentUser!;
    console.log(user);
    database.collection("Users").doc(user.uid).set({
      //Sprawdzic czy istnieje juz taka nazwa uzytkownika
      username: user.displayName
    }).then(() => {
      console.log("Username saved");
      return;
    }).catch((error) => console.log(error.message))
  }

  const isUserExisits = async() => {
    const doc = await database.collection("Users").doc(auth.currentUser!.uid).get();
    return doc.exists;
  }

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
      <Form onSubmit={handleSubmit}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel color="secondary">Email</InputLabel>
            <Input
              color="secondary"
              type="email"
              placeholder="email@email.com"
              name="email"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel color="secondary">Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onChange={handleChange}
              color="secondary"
              endAdornment={
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          
        <Button type="submit">Sign in</Button>
        </Form>

        <Links>
          <Link to="/register">
            Register
          </Link>
          <Link to="/forgotPassword">
            Forgot Password?
          </Link>
        </Links>
      </Wrapper>
    </>
  );
};
