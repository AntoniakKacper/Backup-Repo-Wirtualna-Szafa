import React, {useState} from "react";
import clsx from "clsx";
//import { auth, database } from "../../../database/firebase";
import { styled } from '../../../config/theme';
import { makeStyles } from "@material-ui/core/styles";

//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Header } from "../../Header";

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

interface User {
  login: string;
  email: string;
  password: string;
}


export const Register = () => {
  const classes = useStyles();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  return <>
  <Header />
      <Wrapper>
        <Form>
        <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel color="secondary">Login</InputLabel>
            <Input
              color="secondary"
              type="login"
              placeholder="login"
              onChange={(e) => setLogin(e.target.value)}
            />
          </FormControl>

          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel color="secondary">Email</InputLabel>
            <Input
              color="secondary"
              type="email"
              placeholder="email@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel color="secondary">Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
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

          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-confirmPassword">
              Confirm Password
            </InputLabel>
            <Input
              type={showConfirmedPassword ? "text" : "password"}
              value={confirmedPassword}
              onChange={(e) => {setConfirmedPassword(e.target.value)}}
              color="secondary"
              endAdornment={
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label="toggle confirmPassword visibility"
                    onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                  >
                    {showConfirmedPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Form>

        <Button>Sign in</Button>
        <Links>
          <Link to="/login">
            {/* <StyledLink>Back to login</StyledLink> */}
            Back to login
          </Link>

        </Links>

      </Wrapper>
  </>;
};
