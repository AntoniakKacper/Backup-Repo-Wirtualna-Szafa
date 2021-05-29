import { ReactComponent as Hanger } from "images/hanger-light.svg";
import React, { SetStateAction } from "react";
import { Cloth } from "store/types/clothTypes";
import styled from "styled-components";
import {
  CardContainer,
  CardDetailsContainer,
  CardInfoContainer,
  CardTitle,
  ClicableIcon,
  ColorCircle,
  DeleteButton,
} from "styles/Card";
import {
  ClickableIcon,
  StyledAddIcon,
  StyledDeleteIcon,
} from "../Outfits/styles/AddOutfitsStyles";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  margin-right: 30px;
`;

const Icon = styled.div`
  font-size: 1.2rem;
  color: #e0e0e0;
`;

const Text = styled.div`
  margin-top: 8px;
`;

interface AddedClothItemProps {
  cloth: Cloth;
  deleteButton?: boolean;
  addButton?: boolean;
  xButton?: boolean;
  handleDelete?: (cloth: Cloth) => void;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
}

const AddedClothItem: React.FC<AddedClothItemProps> = ({
  cloth,
  deleteButton,
  addButton,
  xButton,
  handleDelete,
  setOpen,
}) => {
  return (
    <CardContainer>
      <img src={cloth.imageUrl} alt={cloth.name} />
      <CardInfoContainer>
        <CardTitle>{cloth.name}</CardTitle>
        <CardDetailsContainer>
          <Column>
            <Hanger />
            <Text>{cloth.category}</Text>
          </Column>
          <Column>
            <Icon>
              <i className="fas fa-star" />
            </Icon>

            <Text>{cloth.occasion}</Text>
          </Column>
          <Column>
            <ColorCircle color={cloth.color} />
            <Text>Color</Text>
          </Column>
        </CardDetailsContainer>
      </CardInfoContainer>

      {deleteButton && (
        <>
          <ClicableIcon
            onClick={() => {
              handleDelete && handleDelete(cloth);
              setOpen && setOpen(true);
            }}
          >
            <DeleteButton />
          </ClicableIcon>
        </>
      )}
      {addButton && (
        <ClickableIcon>
          <StyledAddIcon onClick={() => handleDelete && handleDelete(cloth)} />
        </ClickableIcon>
      )}
      {xButton && (
        <ClickableIcon>
          <StyledDeleteIcon
            onClick={() => handleDelete && handleDelete(cloth)}
          />
        </ClickableIcon>
      )}
    </CardContainer>
  );
};

export default AddedClothItem;
