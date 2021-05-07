import React from "react";

import {
  OutfitContainer,
  OutfitImagesContainer,
  OutfitBottomBar,
  Info,
  ButtonsContainer,
  DottedMenuButton,
  StyledButton,
  StyledEditButton,
  StyledDeleteButton,
  StyledTypography,
  LikeContainer,
  Heart,
} from "./styles/OutfitCardStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Outfit } from "../../../../store/types/outfitTypes";
import { useDispatch } from "react-redux";
import { deleteOutfit } from "../../../../store/actions/outfitActions";

interface OutfitCardProps {
  outfit: Outfit;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
            <p>
              <strong>#Username</strong>
            </p>
            <p>
              <strong>Name:</strong> {outfit.name}
            </p>
            <LikeContainer>
              <strong>Likes</strong> <Heart /> 123
            </LikeContainer>
          </Info>
          <ButtonsContainer>
            <StyledButton onClick={handleOpen}>
              <DottedMenuButton />
            </StyledButton>
          </ButtonsContainer>
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
