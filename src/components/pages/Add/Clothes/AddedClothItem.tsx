import React from "react";
import { useDispatch } from "react-redux";
import { Cloth } from "../../../../store/types/clothTypes";
import { removeClothFromList } from "../../../../store/actions/clothActions";
import {
  ClicableIcon,
  ColorCircle,
  DeleteButton,
  DisplayColor,
  EditButton,
  ItemCard,
  ItemInfo,
} from "../../../../styles/Card";

interface AddedClothItemProps {
  cloth: Cloth;
  buttons?: boolean;
  handleDelete?: (cloth: Cloth) => void;
}

export const AddedClothItem: React.FC<AddedClothItemProps> = ({
  cloth,
  buttons,
  handleDelete,
}) => {
  const action = useDispatch();
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
          <strong>Weather:</strong> {cloth.weather}
        </p>
        <p>
          <strong>Ocassion:</strong> {cloth.occasion}
        </p>
        <DisplayColor>
          <strong>Color:</strong>
          <ColorCircle color={cloth.color}></ColorCircle>
        </DisplayColor>
      </ItemInfo>

      {buttons && (
        <>
          <ClicableIcon>
            <EditButton />
          </ClicableIcon>
          <ClicableIcon onClick={() => action(removeClothFromList(cloth))}>
            <DeleteButton />
          </ClicableIcon>
        </>
      )}
    </ItemCard>
  );
};

export default AddedClothItem;
