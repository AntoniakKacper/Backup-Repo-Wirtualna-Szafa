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
} from "./styles/AddClothesStyles";

interface AddedClothItemProps {
  cloth: Cloth;
}

export const AddedClothItem: React.FC<AddedClothItemProps> = ({ cloth }) => {
  const action = useDispatch();
  return (
    <ItemCard>
      <img src={cloth.imageUrl} alt={cloth.name} />
      <ItemInfo>
        <p>
          <span>Name:</span> {cloth.name}
        </p>
        <p>
          <span>Catergory:</span> {cloth.category}
        </p>
        <p>
          <span>Weather:</span> {cloth.weather}
        </p>
        <p>
          <span>Ocassion:</span> {cloth.occasion}
        </p>
        <DisplayColor>
          <span>Color:</span>
          <ColorCircle color={cloth.color}></ColorCircle>
        </DisplayColor>
      </ItemInfo>
      <ClicableIcon>
        <EditButton />
      </ClicableIcon>
      <ClicableIcon onClick={() => action(removeClothFromList(cloth))}>
        <DeleteButton />
      </ClicableIcon>
    </ItemCard>
  );
};

export default AddedClothItem;
