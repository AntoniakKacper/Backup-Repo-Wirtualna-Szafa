import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { database } from "../../../../database/firebase";
import styled from "styled-components";

interface CustomInputProps {
  name: string;
}

const StyledForm = styled(FormControl)`
  && {
    min-width: 150px;
    margin-top: 30px;
  }
`;

export const CustomInput: React.FC<CustomInputProps> = ({ name }) => {
  const [category, setCategory] = useState("");

  const getCategories = () => {
    console.log(
      database
        .collection("/ClothCategories")
        .doc("Cap")
        .get()
        .then((doc) => doc.data())
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };
  return (
    <StyledForm variant="outlined">
      <InputLabel>{name}</InputLabel>
      <Select value={category} onChange={handleChange} label="Category">
        <MenuItem value="cap">Cap</MenuItem>
        <MenuItem value={20}>Hoodie</MenuItem>
        <MenuItem value={30}>Tshirt</MenuItem>
        <MenuItem value={40}>Pant</MenuItem>
        <MenuItem value={50}>Jacket</MenuItem>
        <MenuItem value={60}>Dress</MenuItem>
        <MenuItem value={70}>Accessories</MenuItem>
        <MenuItem value={80}>High-heels</MenuItem>
        <MenuItem value={90}>Sneekers</MenuItem>
      </Select>
    </StyledForm>
  );
};
