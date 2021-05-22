import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { deleteCloth, getAddedClothes } from "store/actions/clothActions";
import { Cloth } from "store/types/clothTypes";
import {
  ClicableIcon,
  ColorCircle,
  DeleteButton,
  DisplayColor,
  EditButton,
  ItemCard,
  ItemInfo,
} from "styles/Card";
import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
import {
  BackArrow,
  NavigationBar,
} from "pages/Add/Clothes/styles/AddClothesStyles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AddedClothItem from "pages/Add/Clothes/AddedClothItem";
import { Navbar } from "components/elements/Navbar";

interface DisplayClothesProps {}

export const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  margin: 0px 20px 96px 20px;

  & > h2 {
    padding-bottom: 20px;
  }
`;

const DisplayClothes: React.FC<DisplayClothesProps> = () => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userClothes } = useSelector((state: RootState) => state.cloth);

  const handleDelete = (cloth: Cloth) => {
    action(deleteCloth(cloth));
  };

  useEffect(() => {
    user && action(getAddedClothes(user.id));
  }, []);

  return (
    <>
      <Navbar path="/wardrobe" />
      <Wrapper>
        <h2>My clothes</h2>
        {userClothes &&
          userClothes.map((item: Cloth) => (
            <AddedClothItem
              key={item.id}
              cloth={item}
              handleDelete={handleDelete}
              deleteButton={true}
            />
          ))}
      </Wrapper>
    </>
  );
};

export default DisplayClothes;
