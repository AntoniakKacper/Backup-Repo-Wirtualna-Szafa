import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../store";
import { getAddedClothes } from "../../../store/actions/clothActions";
import {
  countClothInOutfits,
  getUserOutfits,
} from "../../../store/actions/outfitActions";
import { Cloth } from "../../../store/types/clothTypes";
import { AccordionComponent } from "./AccordionComponent";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface StatisticsProps {}

interface MostUsedCloth {
  cloth: Cloth;
  count: number;
}

export const Statistics: React.FC<StatisticsProps> = ({}) => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userClothes } = useSelector((state: RootState) => state.cloth);
  const { outfits } = useSelector((state: RootState) => state.outfit);
  const { mostUsedCloth } = useSelector((state: RootState) => state.outfit);

  useEffect(() => {
    if (user) {
      action(countClothInOutfits(user.id));
    }
  }, []);

  return (
    <Wrapper>
      <AccordionComponent
        title="Cloth Count"
        content={userClothes.length}
        name="Cloth"
      />
      <AccordionComponent
        title="Outfit Count"
        content={outfits.length}
        name="Outfit"
      />
      <AccordionComponent
        title="Most used cloth"
        content={mostUsedCloth?.count!}
        mostUsedCloth={mostUsedCloth}
      />
    </Wrapper>
  );
};
