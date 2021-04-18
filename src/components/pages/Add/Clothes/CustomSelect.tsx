import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, { useState } from "react";
import styled from "styled-components";

interface CustomSelectProps {
  options: string[];
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const StyledForm = styled(FormControl)`
  && {
    min-width: 150px;
    margin-top: 30px;
  }
`;

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  name,
  onChange,
  value,
}) => {
  const [selectValue, setSelectValue] = useState("");

  const handleChange = (event: any) => {
    onChange(event);
    setSelectValue(event.target.value as string);
  };

  return (
    <StyledForm variant="outlined">
      <InputLabel>{name}</InputLabel>
      <Select
        name={name}
        value={selectValue}
        label={name}
        onChange={handleChange}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </StyledForm>
  );
};
