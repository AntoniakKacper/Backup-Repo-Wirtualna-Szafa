import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash } from "@styled-icons/boxicons-regular/Trash";
import Button from "@material-ui/core/Button";

export const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  //width: 100%;
  padding-bottom: 96px;
  padding-top: 20px;
`;

export const NoItemsAdded = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  margin-top: 100px;
`;

export const BackArrow = styled(Link)`
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
  color: #757575;
`;

export const Info = styled.p`
  text-align: center;
  padding-top: 20px;
  color: #757575;
  width: 300px;
`;

export const AddedClothes = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 700px;
  min-width: 330px;
`;

export const DisplayColor = styled.div`
  display: flex;
`;

export const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #757575;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-left: 5px;
`;

export const EditButton = styled(Pencil)`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  margin-top: 15px;
  margin-right: 15px;
  color: #757575;
`;

export const DeleteButton = styled(Trash)`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  bottom: 0%;
  margin-bottom: 15px;
  margin-right: 15px;
  color: #757575;
`;

export const ClicableIcon = styled.div`
  & :hover {
    cursor: pointer;
  }
`;

export const ClearButton = styled(Button)`
  max-width: 100px;
`;

export const SaveChangesButton = styled(Button)`
  && {
    
    font-weight: bold;
    text-transform: none;
    font-size: 15px;
    margin-right: 20px;
  }
`;

export const NavigationBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
