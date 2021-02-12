import React from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import { styled } from "../../config/theme";
import { flexCenterXY } from "../../styles/shared-style";
import { MyField } from "./MyField";
import * as Yup from "yup";

interface Values {
  email: string;
  password: string;
}

const StyledForm = styled(Form)`
  ${flexCenterXY}
  width: 250px;
  flex-direction: column;
  padding-top: 150px;
  padding-bottom: 100px;
`;

const StyledButton = styled(Button)`
  margin-top: 100px;
`;

interface MyFormProps {
  // email: string;
  // password: string,
  onSubmit: (values: Values) => void;
}

const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter email"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Enter Password")
    .matches(REGEX_PASSWORD, "Password does not meet requirements."),
});

export const SignInForm: React.FC<MyFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SigninSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values }) => (
        <StyledForm>
          <MyField name="email" placeholder="Email"></MyField>
          <MyField name="password" placeholder="Password" />
          <StyledButton variant="outlined" color="secondary" type="submit">
            Sign in
          </StyledButton>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </StyledForm>
      )}
    </Formik>
  );
};
