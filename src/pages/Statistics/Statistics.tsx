import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "store/index";
import { getAddedClothes } from "store/actions/clothActions";
import {
  countClothInOutfits,
  getUserOutfits,
} from "store/actions/outfitActions";

import { AccordionComponent } from "./AccordionComponent";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface StatisticsProps {}

export const Statistics: React.FC<StatisticsProps> = () => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userClothes } = useSelector((state: RootState) => state.cloth);
  const { userOutfits, mostUsedCloth } = useSelector(
    (state: RootState) => state.outfit
  );

  useEffect(() => {
    if (user) {
      action(getAddedClothes(user.id));
      action(countClothInOutfits(user.id));
      action(getUserOutfits(user.id));
    }
  }, [action, user]);

  return (
    <Wrapper>
      <AccordionComponent
        title="Cloth Count"
        content={userClothes.length}
        name="Cloth"
      />
      <AccordionComponent
        title="Outfit Count"
        content={userOutfits.length}
        name="Outfit"
      />
      <AccordionComponent
        title="Most used cloth"
        mostUsedCloth={userClothes.length !== 0 ? mostUsedCloth : null}
      />
    </Wrapper>
  );
};
