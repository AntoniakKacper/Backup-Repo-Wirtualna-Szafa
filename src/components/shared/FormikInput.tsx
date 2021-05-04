import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FieldAttributes, useField } from "formik";
import React, { useState } from "react";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  && {
    min-width: 150px;
    margin: 15px 0;
  }
`;

interface FormikInputProps {
  passwordDecoration?: boolean;
  label: string;
  variant?: "standard" | "filled" | "outlined";
  fullWidth?: boolean;
}

export const FormikInput: React.FC<FieldAttributes<{}> & FormikInputProps> = ({
  passwordDecoration,
  label,
  variant = "outlined",
  fullWidth = true,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <StyledTextField
      {...field}
      label={label}
      color="primary"
      fullWidth={fullWidth}
      helperText={errorText}
      error={!!errorText}
      variant={variant}
      type={passwordDecoration ? (showPassword ? "text" : "password") : "input"}
      autoComplete="on"
      required={required}
      InputProps={
        passwordDecoration
          ? {
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
};
