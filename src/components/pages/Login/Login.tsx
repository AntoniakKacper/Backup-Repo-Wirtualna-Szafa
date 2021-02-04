import React, { useState } from "react";
import clsx from "clsx";
// import { auth, database } from "../../../database/firebase";
// import styled from "styled-components";
import { styled } from '../../../config/theme';
import { makeStyles } from "@material-ui/core/styles";
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

interface User {
  email: string;
  login: string;
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

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.opium};
`

export const Login: React.FC = () => {
  const classes = useStyles();

  const [user, setUser] = useState(null);
  //const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header />
      <Wrapper>
      <Form>
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
              onChange={(e) => setPassword(e.target.value)}
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

          
        </Form>

        <Button>Sign in</Button>
        <Links>
          <Link to="/register">
            <StyledLink>Register</StyledLink>
          </Link>
          <Link to="/forgotPassword">
            <StyledLink>Forgot Password?</StyledLink>
          </Link>
        </Links>
      </Wrapper>
    </>
  );
};
