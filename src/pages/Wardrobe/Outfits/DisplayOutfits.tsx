import { Navbar } from "components/elements/Navbar";
import { ReactComponent as OutfitImage } from "images/outfit.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Info } from "pages/Add/Clothes/styles/AddClothesStyles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getAllOutfits } from "store/actions/outfitActions";
import { Outfit } from "store/types/outfitTypes";
import { OutfitCard } from "./OutfitCard";
import {
  NoOutfitsInfo,
  StyledButton,
  Wrapper,
} from "./styles/DisplayOutfitsStyles";

interface DisplayOutfitsProps {}

const DisplayOutfits: React.FC<DisplayOutfitsProps> = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const action = useDispatch();

  const { outfits } = useSelector((state: RootState) => state.outfit);
  useEffect(() => {
    action(getAllOutfits());
  }, [action]);

  const userOutfits = outfits.filter((outfit) => outfit.userId === user?.id);

  return (
    <>
      <Navbar path="/wardrobe" />
      <Wrapper>
        {userOutfits.length !== 0 ? (
          <>
            <h2>My outfits</h2>
            {userOutfits.map((outfit: Outfit) => (
              <OutfitCard
                outfit={outfit}
                key={outfit.id}
                myOutfits={true}
                withLike={true}
              />
            ))}
          </>
        ) : (
          <NoOutfitsInfo>
            <OutfitImage width="70px" height="70px" />
            <Info>{`There are no outfits added`}</Info>
            <Link to="/addOutfits">
              <StyledButton color="secondary">Add outfits</StyledButton>
            </Link>
          </NoOutfitsInfo>
        )}
      </Wrapper>
    </>
  );
};

export default DisplayOutfits;
