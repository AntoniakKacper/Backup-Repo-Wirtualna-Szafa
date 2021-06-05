import styled from "styled-components";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash } from "@styled-icons/boxicons-regular/Trash";
import Button from "@material-ui/core/Button";

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  height: 120px;
  background-color: #f8f8f8;
  border-radius: 25px;
  margin-top: 30px;
  border: 3px solid white;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  width: 350px;

  & > img {
    width: 120px;
    border-radius: 20px;
    object-fit: cover;
    transform: scale(1.1);
  }

  &:hover img {
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    transform: scale(1.12);
  }
`;

export const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  margin: 10px 12px 10px 40px;
`;

export const CardTitle = styled.h2`
  color: #000;
`;

export const CardDetailsContainer = styled.div`
  display: flex;
  /* justify-content: space-around; */
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
  top: 10px;
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
