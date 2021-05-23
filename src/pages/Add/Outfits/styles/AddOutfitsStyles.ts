import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";
import {Times} from "@styled-icons/fa-solid/Times"

export const Line = styled.hr`
  min-width: 300px;
  width: 70%;
  max-width: 550px;
  color: #757575;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const OwnedClothesContainer = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  padding-right: 20px;
  padding-left: 20px;

  h2 {
    padding-bottom: 20px;
  }
`;

export const ClickableIcon = styled.div`
  width: 35px;
  height: 35px;
  color: #e91e63;
`;

export const StyledAddIcon = styled(AddIcon)`
  position: absolute;
  right: 10px;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledDeleteIcon = styled(ClearIcon)`
  position: absolute;
  right: 10px;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const AddedClothesContainer = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  padding: 20px 10px 20px 10px;
`;

export const StyledInput = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;



export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 15px;

  padding-bottom: 20px;
`;

export const GridItem = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  ${flexCenterXY};
  overflow: hidden;
  position: relative;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
`;

export const ClothImage = styled.img`
  object-fit: cover;
  
`

export const DeleteButton = styled(Times)`
  position: absolute;
  top: 0;
  right: 4px;
  &:hover {
    cursor: pointer;
  }

  &&{
    width: 25px;
    height: 25px;
  }
`;

