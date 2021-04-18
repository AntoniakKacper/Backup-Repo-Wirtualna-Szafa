import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { SetStateAction, useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../store";
import { CustomSelect } from "./CustomSelect";
import { DropzoneComponent } from "./DropzoneComponent";
import { CirclePicker } from "react-color";
import { database } from "../../../../database/firebase";

interface AddItemProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
}

interface Cloth {
  category: string;
  name: string;
  imageUrl: string;
  weather: string;
  userId: string;
  color: string;
  occasion: string;
}

const StyledButton = styled(Button)`
  font-weight: bold;
  text-transform: none;
`;
const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledDialog = styled(Dialog)`
  max-height: 700px;
  margin-top: auto;
  margin-bottom: auto;
`;

export const AddItem: React.FC<AddItemProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const weather = ["Cold", "Hot", "Warm"];
  const occasions = ["Sport", "Elegant", "Casual", "Business", "Smart Casual"];
  const [cloth, setCloth] = useState<Cloth>({
    name: "",
    imageUrl: "",
    weather: "",
    userId: user!.id,
    category: "",
    color: "",
    occasion: "",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState("");

  const setImageUrl = (url: string) => {
    setCloth({ ...cloth, imageUrl: url });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCloth({
      ...cloth,
      [event.target.name.toLowerCase()]: event.target.value,
    });
  };

  const handleColorChange = (color: any) => {
    setCloth({ ...cloth, color: color.hex });
  };

  const getCategories = async () => {
    const categoriesData: string[] = [];
    await database
      .collection("ClothCategories")
      .get()
      .then((categories) => {
        categories.forEach((category) => {
          categoriesData.push(category.id);
        });
      });
    setCategories(categoriesData);
  };

  useEffect(() => {
    getCategories();
    console.log(cloth);
  }, [cloth]);

  return (
    <StyledDialog open={openDialog} fullWidth={true} maxWidth="sm">
      <DialogTitle>Add item</DialogTitle>
      <DialogContent>
        <DropzoneComponent setImageUrl={setImageUrl} />
        <SelectContainer>
          <TextField
            name="Name"
            value={cloth.name}
            onChange={handleChange}
            label="Name"
            variant="outlined"
          />
          <CustomSelect
            name="Category"
            value={selectValue}
            onChange={handleChange}
            options={categories}
          />
          <CustomSelect
            name="Weather"
            value={selectValue}
            onChange={handleChange}
            options={weather}
          />
          <CirclePicker
            circleSize={25}
            circleSpacing={12}
            onChangeComplete={handleColorChange}
          />
          <CustomSelect
            name="Occasion"
            value={selectValue}
            onChange={handleChange}
            options={occasions}
          />
        </SelectContainer>
      </DialogContent>
      <DialogActions>
        <StyledButton
          color="secondary"
          onClick={() => {
            setOpenDialog(false);
            setCloth({
              name: "",
              imageUrl: "",
              weather: "",
              userId: user!.id,
              category: "",
              color: "",
              occasion: "",
            });
          }}
        >
          Close
        </StyledButton>
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={() => {
            setOpenDialog(false);
          }}
        >
          Add item
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};
