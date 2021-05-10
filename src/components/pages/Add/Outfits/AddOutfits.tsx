import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as OutfitImage } from "../../../../images/outfit.svg";
import { RootState } from "../../../../store";
import TextField from "@material-ui/core/TextField";
import {
  addUserCloth,
  getAddedClothes,
  removeClothFromUserList,
} from "../../../../store/actions/clothActions";
import { Cloth } from "../../../../store/types/clothTypes";
import { flexCenterXY } from "../../../../styles/shared-style";
import {
  BackArrow,
  Info,
  NavigationBar,
  NoItemsAdded,
  SaveChangesButton,
  Wrapper,
} from "../Clothes/styles/AddClothesStyles";
import {
  ColorCircle,
  DisplayColor,
  ItemCard,
  ItemInfo,
} from "../../../../styles/Card";
import ClearIcon from "@material-ui/icons/Clear";
import { v4 as uuidv4 } from "uuid";
import { Outfit } from "../../../../store/types/outfitTypes";
import { addOutfit } from "../../../../store/actions/outfitActions";

interface AddOutfitsProps extends RouteComponentProps<{ category: string }> {}

const Line = styled.hr`
  min-width: 300px;
  width: 70%;
  max-width: 550px;
  color: #757575;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const OwnedClothesContainer = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  padding-right: 20px;
  padding-left: 20px;

  h2 {
    padding-bottom: 20px;
  }
`;

const ClickableIcon = styled.div`
  width: 35px;
  height: 35px;
  color: #e91e63;
`;

const StyledAddIcon = styled(AddIcon)`
  position: absolute;
  right: 10px;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledDeleteIcon = styled(ClearIcon)`
  position: absolute;
  right: 10px;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const AddedClothesContainer = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  padding: 20px 10px 20px 10px;
`;

const StyledInput = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;

export const AddOutfits: React.FC<AddOutfitsProps> = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const action = useDispatch();
  const { userClothes } = useSelector((state: RootState) => state.cloth);
  const [addedClothes, setAddedClothes] = useState<Cloth[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    user && action(getAddedClothes(user.id));

    return () => {
      setAddedClothes([]);
      setName("");
    };
  }, []);

  const HandleSave = () => {
    const initialState: Outfit = {
      id: uuidv4().toString(),
      clothesList: addedClothes,
      name: name,
      userId: user!.id,
      likesCount: 0,
    };
    action(addOutfit(initialState));
  };

  const AddClothToOutfit = (cloth: Cloth) => {
    setAddedClothes([...addedClothes, cloth]);
    action(removeClothFromUserList(cloth));
  };

  const RemoveClothFromOutfit = (cloth: Cloth) => {
    setAddedClothes(addedClothes.filter((item) => item.id !== cloth.id));
    action(addUserCloth(cloth));
  };

  return (
    <Wrapper>
      <NavigationBar>
        <BackArrow to="/add">
          <ArrowBackIosIcon fontSize="large" />
        </BackArrow>

        {addedClothes.length > 2 && addedClothes.length <= 6 && (
          <Link to="/myOutfits">
            <SaveChangesButton onClick={() => HandleSave()}>
              Save
            </SaveChangesButton>
          </Link>
        )}
      </NavigationBar>
      <AddedClothesContainer>
        {addedClothes.length > 0 && (
          <StyledInput
            label="Name"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
          />
        )}
        {addedClothes.length > 0 ? (
          addedClothes.map((item: Cloth, index: number) => (
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
                <StyledDeleteIcon onClick={() => RemoveClothFromOutfit(item)} />
              </ClickableIcon>
            </ItemCard>
          ))
        ) : (
          <NoItemsAdded>
            <OutfitImage width="70px" height="70px" />
            <Info>{`There are no outfits added`}</Info>
          </NoItemsAdded>
        )}
      </AddedClothesContainer>

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
              <StyledAddIcon onClick={() => AddClothToOutfit(item)} />
            </ClickableIcon>
          </ItemCard>
        ))}
      </OwnedClothesContainer>
    </Wrapper>
  );
};
