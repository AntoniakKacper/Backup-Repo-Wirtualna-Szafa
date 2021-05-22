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
    <Wrapper open={openDialog}>
      <Tittle>{outfit.name}</Tittle>
      <StyledDialogContent>
        <BottomContainter>
          <Container>
            <h2>Likes</h2>
            <DisplayContainer>
              <Heart color="secondary" />
              <h3>{likes}</h3>
            </DisplayContainer>
          </Container>
          <Container>
            <h2>Weather</h2>
            <DisplayContainer>
              <GetWeatherIcon weather={outfit.weather} />
              <h4>{outfit.weather}</h4>
            </DisplayContainer>
          </Container>
        </BottomContainter>
        <UserInfo>
          <StyledAvatar alt={username} src={userAvatar} />
          <p>
            <strong>#{username}</strong>
          </p>
        </UserInfo>
        {outfit.clothesList.map((cloth) => (
          <AddedClothItem key={cloth.id} cloth={cloth} />
        ))}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Wrapper>
  );
};
