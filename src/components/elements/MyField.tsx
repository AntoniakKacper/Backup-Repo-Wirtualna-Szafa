import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FieldAttributes, useField } from "formik";
import React, { useState } from "react";
import { StyledInput } from "components/styledComponents/AuthStyles";

interface Props {
  passwordDecoration?: boolean;
}

export const MyField: React.FC<FieldAttributes<{}> & Props> = ({
  passwordDecoration,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  if (passwordDecoration) {
    return (
      <>
        <StyledInput
          placeholder={placeholder}
          {...field}
          color="primary"
          label={placeholder}
          fullWidth={true}
          helperText={errorText}
          error={!!errorText}
          type={showPassword ? "text" : "password"}
          autoComplete="on"
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
        <StyledInput
          placeholder={placeholder}
          label={placeholder}
          {...field}
          fullWidth={true}
          helperText={errorText}
          error={!!errorText}
          type="input"
          color="primary"
          autoComplete="on"
        />
      </>
    );
  }
};
