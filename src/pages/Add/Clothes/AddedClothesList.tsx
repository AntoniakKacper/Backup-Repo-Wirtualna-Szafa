import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Navbar } from "components/elements/Navbar";
import { SuccessSnackbar } from "components/elements/SuccessSnackbar";
import { FloatingButton } from "components/shared/FloatingButton";
import { ReactComponent as ClothImage } from "images/cloth.svg";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "store";
import {
  addClothesToDatabase,
  clearClothesList,
  removeClothFromList,
} from "store/actions/clothActions";
import { Cloth } from "store/types/clothTypes";
import AddedClothItem from "./AddedClothItem";
import { AddItemDialog } from "./Dialog/AddItemDialog";
import {
  AddedClothes,
  Info,
  NoItemsAdded,
  Wrapper,
} from "./styles/AddClothesStyles";

interface AddedClothesProps extends RouteComponentProps<{ category: string }> {}

const AddedClothesList: React.FC<AddedClothesProps> = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { clothesList } = useSelector((state: RootState) => state.cloth);
  const [open, setOpen] = useState(false);
  const action = useDispatch();

  const handleSave = () => {
    action(addClothesToDatabase(clothesList));
    setOpen(true);
    action(clearClothesList());
  };

  const handleDelete = (cloth: Cloth) => {
    action(removeClothFromList(cloth));
  };

  return (
    <>
      <Navbar path="/add" clothesList={clothesList} handleSave={handleSave} />
      <Wrapper>
        {clothesList.length !== 0 ? (
          <AddedClothes>
            {clothesList.map((cloth: Cloth, index: number) => (
              <AddedClothItem
                cloth={cloth}
                key={index}
                deleteButton={true}
                handleDelete={handleDelete}
              ></AddedClothItem>
            ))}
            <Button
              color="secondary"
              onClick={() => action(clearClothesList())}
            >
              Clear all
            </Button>
          </AddedClothes>
        ) : (
          <NoItemsAdded>
            <ClothImage width="70px" height="70px" />
            <Info>There are no items added</Info>
          </NoItemsAdded>
        )}

        <FloatingButton
          color="secondary"
          aria-label="add"
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon />
        </FloatingButton>
        <AddItemDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        <SuccessSnackbar
          open={open}
          setOpen={setOpen}
          message={
            clothesList.length > 1
              ? "Cloth has been successfully added"
              : "Clothes have been succsessfully added"
          }
        />
      </Wrapper>
    </>
  );
};

export default AddedClothesList;
