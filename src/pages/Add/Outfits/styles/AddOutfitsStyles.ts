import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";

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

export const OutfitForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  padding-top: 30px;
`;
