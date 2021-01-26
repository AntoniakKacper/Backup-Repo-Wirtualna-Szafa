import React from "react";
import clsx from "clsx";
// import { auth, database } from "../../../database/firebase";
// import styled from "styled-components";
import { styled } from '../../../config/theme';
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Link } from "react-router-dom";

import { Header } from "../../Header";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "../../elements/Button";

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

const Links = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  padding-top: 40px;
  color: ${(props) => props.theme.color.opium};
`;

export const Login: React.FC = () => {
  const classes = useStyles();

  // const [user, setUser] = useState(null);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // useEffectfect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       //user has logged in
  //       console.log(authUser);
  //       setUser(authUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [user, username]);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop:any) => (event:any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event:any) => {
    event.preventDefault();
  };

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
            />
          </FormControl>

          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel color="secondary">Password</InputLabel>
            <Input
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              color="secondary"
              endAdornment={
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Form>

        <Button>Sign in</Button>
        <Links>
          {/* <Link to="/register">Register</Link> */}

          <p>Forgot your password?</p>
        </Links>
      </Wrapper>
    </>
  );
};
