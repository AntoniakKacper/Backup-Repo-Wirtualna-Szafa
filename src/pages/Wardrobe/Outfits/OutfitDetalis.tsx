import React, { SetStateAction } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import { Outfit } from "store/types/outfitTypes";
import Button from "@material-ui/core/Button";

import AddedClothItem from "pages/Add/Clothes/AddedClothItem";
import {
  Container,
  UserInfo,
  Heart,
  Tittle,
  BottomContainter,
  Wrapper,
  DisplayContainer,
  ClothesWrapper,
  Star,
} from "./styles/OutfitDetailsStyles";
import { StyledAvatar } from "./styles/OutfitCardStyles";
import { GetWeatherIcon } from "utils/WeatherIcon";
import { StyledDialogContent } from "styles/Dialog";

interface OutfitDetalisProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
  outfit: Outfit;
  username: string;
  userAvatar: string;
  likes: number;
}

export const OutfitDetalis: React.FC<OutfitDetalisProps> = ({
  openDialog,
  setOpenDialog,
  outfit,
  username,
  userAvatar,
  likes,
}) => {
  return (
    <Wrapper open={openDialog} fullWidth>
      <Tittle>{outfit.name}</Tittle>
      <StyledDialogContent>
        <BottomContainter>
          <Container>
            <h3>Likes</h3>
            <DisplayContainer>
              <Heart color="secondary" />
              <h5>{likes}</h5>
            </DisplayContainer>
          </Container>
          <Container>
            <h3>Weather</h3>
            <DisplayContainer>
              <GetWeatherIcon weather={outfit.weather} />
              <h5>{outfit.weather}</h5>
            </DisplayContainer>
          </Container>
          <Container>
            <h3>Occassion</h3>
            <DisplayContainer>
              <Star />
              <h5>{outfit.occassion}</h5>
            </DisplayContainer>
          </Container>
        </BottomContainter>
        <UserInfo>
          <StyledAvatar alt={username} src={userAvatar} />
          <p>
            <strong>#{username}</strong>
          </p>
        </UserInfo>
        <ClothesWrapper>
          {outfit.clothesList.map((cloth) => (
            <AddedClothItem key={cloth.id} cloth={cloth} />
          ))}
        </ClothesWrapper>
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Wrapper>
  );
};
