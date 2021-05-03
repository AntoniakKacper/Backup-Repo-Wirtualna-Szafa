import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React, { SetStateAction, useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getAddedClothes } from "../../../../store/actions/clothActions";
import {
  ItemCard,
  ItemInfo,
  DisplayColor,
  ColorCircle,
  EditButton,
  DeleteButton,
  ClicableIcon,
} from "../Clothes/styles/AddClothesStyles";
import clothReducers from "../../../../store/reducers/clothReducers";
import { Cloth } from "../../../../store/types/clothTypes";

interface AddOutfitDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
}

interface SelectCloth {
  category: string;
  name: string;
  imageUrl: string;
  weather: string;
  userId: string;
  color: string;
  occasion: string;
  selected: boolean;
}

const StyledButton = styled(Button)`
  font-weight: bold;
  text-transform: none;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const StyledDialog = styled(Dialog)`
  max-height: 700px;
  margin-top: auto;
  margin-bottom: auto;
`;

const UserClothesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 70px);
  grid-gap: 5px;
`;

const UserClothCard = styled(ItemCard)<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#c2c2c2" : "white")};

  &:hover {
    cursor: pointer;
  }
`;

export const AddOutfitDialog: React.FC<AddOutfitDialogProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userClothes } = useSelector((state: RootState) => state.cloth);

  useEffect(() => {
    user && action(getAddedClothes(user.id));
  }, []);

  return (
    <StyledDialog open={openDialog} fullWidth={true} maxWidth="sm">
      <DialogTitle>Add Outfit</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <StyledButton color="secondary" onClick={() => setOpenDialog(false)}>
          Close
        </StyledButton>
        <StyledButton color="secondary" variant="contained">
          Add item
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};
