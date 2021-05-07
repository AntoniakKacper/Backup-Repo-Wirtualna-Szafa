import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getUserOutfits } from "../../../../store/actions/outfitActions";
import { Wrapper } from "./styles/OutfitCardStyles";
import { OutfitCard } from "./OutfitCard";

interface DisplayOutfitsProps {}

export const DisplayOutfits: React.FC<DisplayOutfitsProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { userOutfits } = useSelector((state: RootState) => state.outfit);
  const action = useDispatch();

  useEffect(() => {
    user && action(getUserOutfits(user.id));
  }, [userOutfits]);
  return (
    <Wrapper>
      {userOutfits?.map((outfit) => (
        <OutfitCard outfit={outfit} key={outfit.id} />
      ))}
    </Wrapper>
  );
};
