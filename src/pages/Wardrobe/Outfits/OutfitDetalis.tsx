import React, { SetStateAction } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import { Outfit } from "store/types/outfitTypes";
import Button from "@material-ui/core/Button";

import AddedClothItem from "pages/Add/Clothes/AddedClothItem";
import {
  Content,
  Heart,
  LikesContainer,
  Tittle,
  Wrapper,
} from "./styles/OutfitDetailsStyles";
import { StyledAvatar, UserInfo } from "./styles/OutfitCardStyles";

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
      <Content>
        {outfit.clothesList.map((cloth) => (
          <AddedClothItem key={cloth.id} cloth={cloth} />
        ))}
        <UserInfo>
          <StyledAvatar alt={username} src={userAvatar} />
          <p>
            <strong>#{username}</strong>
          </p>
        </UserInfo>
        <h2>Likes</h2>
        <LikesContainer>
          <Heart color="secondary" />
          <h3>{likes}</h3>
        </LikesContainer>
      </Content>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Wrapper>
  );
};
