import { Cloth } from "models/cloth.model";
import React from "react";
import AddedClothItem from "../Clothes/AddedClothItem";
import { OwnedClothesContainer } from "./styles/AddOutfitsStyles";

interface OwnedClothesProps {
  addClothToOutfit: (cloth: Cloth) => void;
  clothes: Cloth[] | [];
  addedClothes: Cloth[];
}

export const OwnedClothes: React.FC<OwnedClothesProps> = ({
  addClothToOutfit,
  clothes,
  addedClothes,
}) => {
  return (
    <OwnedClothesContainer>
      <h2>Owned clothes</h2>
      {addedClothes.length < 6
        ? clothes.map((cloth: Cloth) => (
            <AddedClothItem
              cloth={cloth}
              handleDelete={addClothToOutfit}
              addButton={true}
              key={cloth.id}
            />
          ))
        : clothes.map((cloth: Cloth) => (
            <AddedClothItem cloth={cloth} key={cloth.id} />
          ))}
    </OwnedClothesContainer>
  );
};
