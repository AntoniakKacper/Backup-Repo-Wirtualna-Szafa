import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Field, FieldInputProps } from "formik";
import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledFormControl = styled(FormControl)`
  && {
    min-width: 150px;
    margin: 15px 0;
  }
`;

interface FormikSelectProps {
  options: string[];
  label: string;
  name: string;
  required?: boolean;
}

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
  label: string;
  children: ReactNode;
  errorString?: string;
  required?: boolean;
  fullWidth?: boolean;
}

const MaterialUISelectField: React.FC<MaterialUISelectFieldProps> = ({
  label,
  errorString,
  children,
  value,
  name,
  onChange,
  onBlur,
  fullWidth = true,
  required = false,
}) => {
  return (
    <StyledFormControl variant="outlined" fullWidth={fullWidth}>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        label={label}
      >
        {children}
        <FormHelperText>{errorString}</FormHelperText>
      </Select>
    </StyledFormControl>
  );
};

export const FormikSelect: React.FC<FormikSelectProps> = ({
  label,
  options,
  name,
  required = false,
}) => {
  return (
    <Field
      name={name}
      as={MaterialUISelectField}
      label={label}
      required={required}
    >
      {options.map((option) => {
        return (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        );
      })}
    </Field>
  );
};
