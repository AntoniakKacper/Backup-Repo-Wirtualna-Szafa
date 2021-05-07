import styled from "styled-components";
import { flexCenterXY } from "../../../../../styles/shared-style";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

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
  margin: 20px 50px 30px 50px;
  color: #757575;
  border-radius: 20px;
  overflow: hidden;
  max-width: 300px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
  transition: 0.5s ease;
  /* cursor: pointer; */

  &:hover{
      transform: scale(1.02);
  }
`;

export const OutfitImagesContainer = styled.div`
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
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
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  font-size: 12px;
`;

export const LikeContainer = styled.div`
    display: flex;
`;
export const Heart = styled(FavoriteBorderIcon)`
    margin-left: 5px;
    margin-right: 5px;

    &:hover{
        cursor: pointer;
    }
`;

export const DetailsButton = styled.p`
  ${flexCenterXY}
  font-size: 10px;
  color: #347edd;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;  
    align-items: flex-end;
`;

export const DottedMenuButton = styled(MoreVertIcon)`

    &:hover{
        cursor: pointer;
    }
`;

export const StyledButton = styled.button`
    all: unset;
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



// const Mansory3 = styled.div<{
//   length: number;
// }>`
//   display: grid;
//   ${({ length }) =>
//     length === 3 &&
//     `grid-template-columns: auto auto;
//   grid-template-rows: auto auto;
//   grid-column: 1 / span 2;`}

//   ${({ length }) =>
//     length === 4 &&
//     `grid-template-columns: auto auto;
//   grid-template-rows: 50% 50%;`}

// ${({ length }) =>
//     length === 5 &&
//     `grid-template-columns: auto auto auto;
//   grid-template-rows: auto auto auto;
// `}

// ${({ length }) =>
//     length === 6 &&
//     `grid-template-columns: auto auto auto;
//   grid-template-rows: 50% 50%;
// `}

//   & > img {
//     width: 100%;
//     height: 100%;
//     object-fit: fill;
//   }
// `;