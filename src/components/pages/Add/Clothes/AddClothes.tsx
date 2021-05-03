import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ReactComponent as ClothImage } from "../../../../images/cloth.svg";
import { RootState } from "../../../../store";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  addClothesToDatabase,
  clearClothesList,
  removeClothFromList,
} from "../../../../store/actions/clothActions";
import { Cloth } from "../../../../store/types/clothTypes";
import { AddItem } from "./AddItem";
import {
  Wrapper,
  NoItemsAdded,
  BackArrow,
  Info,
  AddButton,
  AddedClothes,
  ItemCard,
  ItemInfo,
  DisplayColor,
  ColorCircle,
  EditButton,
  DeleteButton,
  ClearButton,
  ClicableIcon,
  SaveChangesButton,
  NavigationBar,
} from "./styles/AddClothesStyles";

interface AddClothesProps extends RouteComponentProps<{ category: string }> {}

export const AddClothes: React.FC<AddClothesProps> = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { clothesList } = useSelector((state: RootState) => state.cloth);
  const action = useDispatch();

  const HandleSave = () => {
    action(addClothesToDatabase(clothesList));
    action(clearClothesList());
  };

  return (
    <Wrapper>
      <NavigationBar>
        <BackArrow to="/add">
          <ArrowBackIosIcon fontSize="large" />
        </BackArrow>

        {clothesList.length !== 0 && (
          <Link to="/myClothes">
            <SaveChangesButton onClick={HandleSave}>Save</SaveChangesButton>
          </Link>
        )}
      </NavigationBar>
      {clothesList.length !== 0 ? (
        <AddedClothes>
          {clothesList.map((item: Cloth, index: number) => (
            <ItemCard key={index}>
              <img src={item.imageUrl} alt={item.name} />
              <ItemInfo>
                <p>
                  <span>Name:</span> {item.name}
                </p>
                <p>
                  <span>Catergory:</span> {item.category}
                </p>
                <p>
                  <span>Weather:</span> {item.weather}
                </p>
                <p>
                  <span>Ocassion:</span> {item.occasion}
                </p>
                <DisplayColor>
                  <span>Color:</span>
                  <ColorCircle color={item.color}></ColorCircle>
                </DisplayColor>
              </ItemInfo>
              <ClicableIcon>
                <EditButton />
              </ClicableIcon>
              <ClicableIcon onClick={() => action(removeClothFromList(item))}>
                <DeleteButton />
              </ClicableIcon>
            </ItemCard>
          ))}
          <ClearButton
            color="secondary"
            onClick={() => action(clearClothesList())}
          >
            Clear all
          </ClearButton>
        </AddedClothes>
      ) : (
        <NoItemsAdded>
          <ClothImage width="70px" height="70px" />
          <Info>{`There are no items added`}</Info>
        </NoItemsAdded>
      )}

      <AddButton
        color="secondary"
        aria-label="add"
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </AddButton>
      <AddItem openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Wrapper>
  );
};
