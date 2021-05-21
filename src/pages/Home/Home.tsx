import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "store";
import { getAllOutfits } from "store/actions/outfitActions";
import { Outfit } from "store/types/outfitTypes";
import { OutfitCard } from "../Wardrobe/Outfits/OutfitCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 69px;
`;

interface HomePageState {}
const Home: React.FC<HomePageState> = () => {
  const { outfits } = useSelector((state: RootState) => state.outfit);
  const action = useDispatch();

  useEffect(() => {
    action(getAllOutfits());
  }, []);
  return (
    <Wrapper>
      {outfits?.map((outfit: Outfit) => (
        <OutfitCard outfit={outfit} key={outfit.id} withLike={true} />
      ))}
    </Wrapper>
  );
};

export default Home;
