import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { SetStateAction, useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../store";
import { CustomSelect } from "./CustomSelect";
import { DropzoneComponent } from "./DropzoneComponent";
import { CirclePicker } from "react-color";
import { database } from "../../../../database/firebase";
import { addCloth, setCloth } from "../../../../store/actions/clothActions";
import { v4 as uuidv4 } from "uuid";
import { Cloth } from "../../../../store/types/clothTypes";

interface AddItemProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
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
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const weather = ["Cold", "Hot", "Warm", "Rain"];
  const occasions = ["Sport", "Elegant", "Casual", "Business", "Smart Casual"];
  const initialState: Cloth = {
    id: uuidv4().toString(),
    name: "",
    imageUrl: "",
    weather: "",
    userId: user!.id,
    category: "",
    color: "",
    occasion: "",
  };
  const [item, setItem] = useState<Cloth>({
    ...initialState,
  });

  const [categories, setCategories] = useState<string[]>([]);

  const setImageUrl = (url: string) => {
    setItem({ ...item, imageUrl: url });
  };

  const isClothNotFilled = () => {
    const { name, imageUrl, weather, category, color, occasion } = item;
    return (
      name === "" ||
      imageUrl === "" ||
      weather === "" ||
      category === "" ||
      color === "" ||
      occasion === ""
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setItem({
      ...item,
      [event.target.name.toLowerCase()]: event.target.value,
    });
  };

  const handleColorChange = (color: any) => {
    setItem({ ...item, color: color.hex });
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

  const handleSubmit = () => {
    setOpenDialog(false);
    //action(setCloth(item));
    action(addCloth(item));

    setItem({ ...initialState });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <StyledDialog open={openDialog} fullWidth={true} maxWidth="sm">
      <DialogTitle>Add item</DialogTitle>
      <DialogContent>
        <DropzoneComponent setImageUrl={setImageUrl} />
        <SelectContainer>
          <TextField
            name="Name"
            value={item.name}
            onChange={handleChange}
            label="Name"
            variant="outlined"
          />
          <CustomSelect
            name="Category"
            onChange={handleChange}
            options={categories}
          />
          <CustomSelect
            name="Weather"
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
            setItem({ ...initialState });
          }}
        >
          Close
        </StyledButton>
        {isClothNotFilled() ? (
          <StyledButton color="secondary" variant="contained" disabled>
            Add item
          </StyledButton>
        ) : (
          <StyledButton
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
          >
            Add item
          </StyledButton>
        )}
      </DialogActions>
    </StyledDialog>
  );
};
