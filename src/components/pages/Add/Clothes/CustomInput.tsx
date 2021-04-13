import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { database } from "../../../../database/firebase";

interface CustomInputProps {}

export const CustomInput: React.FC<CustomInputProps> = ({}) => {
  const [category, setCategory] = useState({});

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
    <FormControl>
      <InputLabel>Category</InputLabel>
      <Select value={category} onChange={handleChange}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};
