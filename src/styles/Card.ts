import styled from "styled-components";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash } from "@styled-icons/boxicons-regular/Trash";
import Button from "@material-ui/core/Button";

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  /* background-color: #f8f8f7; */
  min-height: 100px;
  max-height: 140px;
  border-radius: 25px;
  margin-bottom: 25px;
  margin-left: 10px;
  margin-right: 10px;
  border: 4px solid white;
  transition: border 0.2s ease-in-out;

  & > img {
    max-height: 140px;
    width: 30%;
    border-radius: 20px;
    object-fit: cover;
  }

  &:hover {
    transition: border 0.2s ease-in-out;
    border: 4px solid #f50057;
    cursor: pointer;
  }
`;

export const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  margin: 10px 12px 10px 24px;
  width: 50%;

  /* color: #757575; */
`;

export const CardTitle = styled.h2`
  color: #000;
`;

export const CardDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
