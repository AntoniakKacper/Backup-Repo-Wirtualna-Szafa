import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
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
import { AddItemDialog } from "./Dialog/AddItemDialog";
import AddedClothItem from "./AddedClothItem";
import {
  AddedClothes,
  BackArrow,
  Info,
  NavigationBar,
  NoItemsAdded,
  SaveChangesButton,
  Wrapper,
} from "./styles/AddClothesStyles";
import { Navbar } from "components/elements/Navbar";

interface AddedClothesProps extends RouteComponentProps<{ category: string }> {}

const AddedClothesList: React.FC<AddedClothesProps> = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { clothesList } = useSelector((state: RootState) => state.cloth);
  const action = useDispatch();

  const handleSave = () => {
    action(addClothesToDatabase(clothesList));
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
      </Wrapper>
    </>
  );
};

export default AddedClothesList;
