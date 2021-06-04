import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FormControl from "@material-ui/core/FormControl";

export const Wrapper = styled.div`
  ${flexCenterXY}
  width: 100%;
  padding-bottom: 69px;
  flex-direction: column;
`;

export const OutfitContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
  margin-top: 20px;
  color: #757575;
  border-radius: 20px;
  overflow: hidden;
  max-width: 300px;
  background-color: #f8f8f8;
  /* box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1); */
  min-width: 240px;
  min-height: 370px;
`;


export const OutfitImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  grid-template-areas:
    "image1 image2"
    "image1 image3";
`;

export const HorizontalImage = styled.img`
  grid-area: image1;
  height: 100%;
  object-fit: cover;
`;

export const Image2 = styled.img`
  grid-area: image2;
  height: 100%;
  object-fit: cover;
`;

export const Image3 = styled.img`
  grid-area: image3;
  height: 100%;
  object-fit: cover;
`;

export const OutfitBottomBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 70px;
  left: 10px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  font-size: 12px;
  & > p {
    padding-bottom: 5px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  margin-top: 15px;
  & > p {
    padding-left: 8px;
  }
`;

export const StyledAvatar = styled(Avatar)`
  && {
    width: 40px;
    height: 40px;
  }
`;

export const LikeContainer = styled.div`
  display: flex;
`;
export const Heart = styled(FavoriteBorderIcon)`
  position: absolute;
  right: 25px;
  bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const FilledHeart = styled(FavoriteIcon)`
  position: absolute;
  right: 25px;
  bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const DetailsButton = styled.p`
  ${flexCenterXY}
  font-size: 12px;
  color: #347edd;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export const DottedMenuButton = styled(MoreVertIcon)`
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledButton = styled.button`
  all: unset;
  position: absolute;
  right: 25px;
  bottom: 40px;
`;

export const StyledEditButton = styled(EditIcon)`
  color: #757575;
  margin-right: 10px;
`;

export const StyledDeleteButton = styled(DeleteIcon)`
  color: #757575;
  margin-right: 10px;
`;

export const StyledTypography = styled(Typography)`
  color: #757575;
  font-size: 14px;
`;

export const StyledInput = styled(FormControl)`
  &&{
    min-width: 120px;
  }
`;
