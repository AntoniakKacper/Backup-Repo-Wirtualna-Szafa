import styled from "styled-components";
import { flexCenterXY } from "../../../../../styles/shared-style";
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
  padding-top: 20px;
  color: #757575;
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
// Items Card styles
export const ItemCard = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  min-height: 100px;
  max-height: 140px;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  & > img {
    max-height: 140px;
    width: 30%;
    border-radius: 20px;
    object-fit: cover;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
  color: #757575;

  & span {
    color: black;
  }
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
    color: #757575;
    font-weight: bold;
    text-transform: none;
    font-size: 15px;
  }
`;

export const NavigationBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
