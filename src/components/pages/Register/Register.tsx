import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { styled } from "../../../config/theme";
import firebase, { auth, database } from "../../../database/firebase";
import { flexCenterXY } from "../../../styles/shared-style";
//import Button from "../../elements/Button";
import Links from "../../elements/Links";
import { Header } from "../../Header";

const useStyles = makeStyles((theme: Theme) => ({
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

//Styled components
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

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export const Register = () => {
  const authContext = useContext(AuthContext);
  const classes = useStyles();

  const [values, setValues] = useState<RegisterFormValues>({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [matchPassword, setMatchPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

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
  useEffect(() => {
    values.password === values.confirmedPassword
      ? setMatchPassword(true)
      : setMatchPassword(false);
  }, [values.password, values.confirmedPassword]);

  return (
    <>
      <Header />
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel color="secondary">Login</InputLabel>
            <Input
              color="secondary"
              type="text"
              placeholder="login"
              name="username"
              onChange={handleChange}
            />
          </FormControl>

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
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel
              htmlFor="standard-adornment-confirmPassword"
              color="secondary"
            >
              Confirm Password
            </InputLabel>
            <Input
              type={showConfirmedPassword ? "text" : "password"}
              value={values.confirmedPassword}
              name="confirmedPassword"
              onChange={handleChange}
              color="secondary"
              endAdornment={
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    onClick={() =>
                      setShowConfirmedPassword(!showConfirmedPassword)
                    }
                  >
                    {showConfirmedPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            disabled={!matchPassword}
            variant="outlined"
            color="secondary"
          >
            Sign in
          </Button>
        </Form>

        <Links>
          <Link to="/login">Back to login</Link>
        </Links>
      </Wrapper>
    </>
  );
};
