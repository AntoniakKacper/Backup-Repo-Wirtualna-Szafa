import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getUserOutfits } from "../../../../store/actions/outfitActions";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {
  Wrapper,
  OutfitContainer,
  OutfitImagesContainer,
  OutfitBottomBar,
  Info,
  DetailsButton,
  ButtonsContainer,
  DottedMenuButton,
  StyledButton,
  StyledEditButton,
  StyledDeleteButton,
  StyledTypography,
} from "./styles/DisplayOutfitsStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

interface DisplayOutfitsProps {}

export const DisplayOutfits: React.FC<DisplayOutfitsProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { userOutfits } = useSelector((state: RootState) => state.outfit);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const action = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    user && action(getUserOutfits(user.id));
  }, []);
  return (
    <Wrapper>
      {userOutfits?.map((outfit) => (
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
              <p>#Username</p>
              <p>Name: {outfit.name}</p>
              <p>Likes</p>
            </Info>
            <ButtonsContainer>
              <StyledButton onClick={handleClick}>
                <DottedMenuButton />
              </StyledButton>
              <DetailsButton>
                Details <ArrowForwardIosIcon fontSize="small" />
              </DetailsButton>
            </ButtonsContainer>
          </OutfitBottomBar>
        </OutfitContainer>
      ))}

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
        <MenuItem onClick={handleClose}>
          <StyledDeleteButton fontSize="small" />
          <StyledTypography variant="inherit">Delete outfit</StyledTypography>
        </MenuItem>
      </Menu>
    </Wrapper>
  );
};
