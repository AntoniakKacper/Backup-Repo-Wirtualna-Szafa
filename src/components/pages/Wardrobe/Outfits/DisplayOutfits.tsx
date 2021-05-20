import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getUserOutfits } from "../../../../store/actions/outfitActions";
import { Wrapper } from "./styles/OutfitCardStyles";
import { OutfitCard } from "./OutfitCard";
import { Outfit } from "../../../../store/types/outfitTypes";

interface DisplayOutfitsProps {}

export const DisplayOutfits: React.FC<DisplayOutfitsProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { outfits } = useSelector((state: RootState) => state.outfit);
  const action = useDispatch();

  useEffect(() => {
    user && action(getUserOutfits(user.id));
  }, []);
  return (
    <Wrapper>
      <h2>My outfits</h2>
      {outfits.map((outfit: Outfit) => (
        <OutfitCard outfit={outfit} key={outfit.id} myOutfits={true} />
      ))}
    </Wrapper>
  );
};
