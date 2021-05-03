import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ReactComponent as OutfitImage } from "../../../../images/outfit.svg";
import { RootState } from "../../../../store";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {
  addClothesToDatabase,
  clearClothesList,
  getAddedClothes,
} from "../../../../store/actions/clothActions";
import {
  Wrapper,
  NoItemsAdded,
  BackArrow,
  Info,
  SaveChangesButton,
  NavigationBar,
  ItemCard,
  ItemInfo,
  DisplayColor,
  ColorCircle,
} from "../Clothes/styles/AddClothesStyles";
import { Cloth } from "../../../../store/types/clothTypes";
import styled from "styled-components";
import { flexCenterXY } from "../../../../styles/shared-style";

interface AddOutfitsProps extends RouteComponentProps<{ category: string }> {}

const Line = styled.hr`
  min-width: 300px;
  width: 70%;
  max-width: 550px;
  color: #757575;
`;

const OwnedClothesContainer = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  padding-right: 20px;
  padding-left: 20px;

  h2 {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

const ClickableIcon = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  color: #e91e63;
  &:hover {
    cursor: pointer;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  position: absolute;
  right: 10px;
`;

export const AddOutfits: React.FC<AddOutfitsProps> = () => {
  const { clothesList } = useSelector((state: RootState) => state.cloth);
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userClothes } = useSelector((state: RootState) => state.cloth);

  useEffect(() => {
    user && action(getAddedClothes(user.id));
  }, []);

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
      <NoItemsAdded>
        <OutfitImage width="70px" height="70px" />
        <Info>{`There are no outfits added`}</Info>
      </NoItemsAdded>

      <Line />

      <OwnedClothesContainer>
        <h2>Owned clothes</h2>
        {userClothes.map((item: Cloth, index: number) => (
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
            <ClickableIcon>
              <StyledAddIcon fontSize="large" />
            </ClickableIcon>
          </ItemCard>
        ))}
      </OwnedClothesContainer>
    </Wrapper>
  );
};
