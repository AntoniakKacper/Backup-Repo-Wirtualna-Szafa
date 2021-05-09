import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { database } from "../../../../database/firebase";
import { deleteOutfit } from "../../../../store/actions/outfitActions";
import { Outfit } from "../../../../store/types/outfitTypes";
import {
  DottedMenuButton,
  Heart,
  Info,
  LikeContainer,
  OutfitBottomBar,
  OutfitContainer,
  OutfitImagesContainer,
  StyledAvatar,
  StyledButton,
  StyledDeleteButton,
  StyledEditButton,
  StyledTypography,
  UserInfo,
  FilledHeart,
} from "./styles/OutfitCardStyles";

interface OutfitCardProps {
  outfit: Outfit;
  myOutfits?: boolean;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  outfit,
  myOutfits,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [toggle, setToggle] = useState(false);
  const action = useDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    action(deleteOutfit(outfit));
    setAnchorEl(null);
  };

  const getUsername = (outfit: Outfit) => {
    try {
      database
        .collection("Users")
        .where("id", "==", outfit.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setUsername(doc.data()["username"]);
            setUserAvatar(doc.data()["imageUrl"]);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsername(outfit);
  }, [outfit]);

  return (
    <>
      <OutfitContainer key={outfit.id}>
        <OutfitImagesContainer>
          {
            <img
              key={outfit.clothesList[0].id}
              src={outfit.clothesList[0].imageUrl}
              alt={outfit.clothesList[0].name}
            />
          }
        </OutfitImagesContainer>
        <OutfitBottomBar>
          <Info>
            <UserInfo>
              <StyledAvatar alt={username} src={userAvatar} />
              <p>
                <strong>#{username}</strong>
              </p>
            </UserInfo>
            <p>
              <strong>Name:</strong> {outfit.name}
            </p>
            <LikeContainer>
              <p>
                <strong>Likes:</strong> 123
              </p>
            </LikeContainer>
          </Info>
          {myOutfits && (
            <StyledButton onClick={handleOpen}>
              <DottedMenuButton />
            </StyledButton>
          )}
          {toggle ? (
            <FilledHeart onClick={() => setToggle(!toggle)} />
          ) : (
            <Heart onClick={() => setToggle(!toggle)} />
          )}
        </OutfitBottomBar>
      </OutfitContainer>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <StyledEditButton fontSize="small" />
          <StyledTypography variant="inherit">Edit outfit</StyledTypography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <StyledDeleteButton fontSize="small" />
          <StyledTypography variant="inherit">Delete outfit</StyledTypography>
        </MenuItem>
      </Menu>
    </>
  );
};
