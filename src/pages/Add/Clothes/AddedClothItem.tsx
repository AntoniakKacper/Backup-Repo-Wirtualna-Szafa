import React from "react";
import { Cloth } from "store/types/clothTypes";
import {
  ClicableIcon,
  ColorCircle,
  DeleteButton,
  DisplayColor,
  ItemCard,
  ItemInfo,
} from "styles/Card";
import {
  ClickableIcon,
  StyledAddIcon,
  StyledDeleteIcon,
} from "../Outfits/styles/AddOutfitsStyles";

interface AddedClothItemProps {
  cloth: Cloth;
  deleteButton?: boolean;
  addButton?: boolean;
  xButton?: boolean;
  handleDelete?: (cloth: Cloth) => void;
}

const AddedClothItem: React.FC<AddedClothItemProps> = ({
  cloth,
  deleteButton,
  addButton,
  xButton,
  handleDelete,
}) => {
  return (
    <ItemCard>
      <img src={cloth.imageUrl} alt={cloth.name} />
      <ItemInfo>
        <p>
          <strong>Name:</strong> {cloth.name}
        </p>
        <p>
          <strong>Catergory:</strong> {cloth.category}
        </p>

        <p>
          <strong>Ocassion:</strong> {cloth.occasion}
        </p>
        <DisplayColor>
          <strong>Color:</strong>
          <ColorCircle color={cloth.color}></ColorCircle>
        </DisplayColor>
      </ItemInfo>

      {deleteButton && (
        <>
          <ClicableIcon onClick={() => handleDelete && handleDelete(cloth)}>
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
    </ItemCard>
  );
};

export default AddedClothItem;
