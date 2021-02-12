import React, { useState } from "react";
import { FieldAttributes, useField } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";

export const MyField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  if (props.name === "password") {
    return (
      <>
        <TextField
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...field}
          color="primary"
          label={!!errorText ? "Error" : placeholder}
          fullWidth={true}
          helperText={errorText}
          error={!!errorText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <TextField
          placeholder={placeholder}
          label={!!errorText ? "Error" : placeholder}
          {...field}
          fullWidth={true}
          helperText={errorText}
          error={!!errorText}
          type="input"
          color="primary"
        />
      </>
    );
  }
};
