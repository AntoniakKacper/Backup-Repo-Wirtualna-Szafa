import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getAllOutfits } from "store/actions/outfitActions";
import { Wrapper } from "./styles/DisplayOutfitsStyles";
import { OutfitCard } from "./OutfitCard";
import { Outfit } from "store/types/outfitTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  BackArrow,
  Info,
  NavigationBar,
  NoItemsAdded,
} from "pages/Add/Clothes/styles/AddClothesStyles";
import { ReactComponent as OutfitImage } from "images/outfit.svg";
import { NoOutfitsInfo, StyledButton } from "./styles/DisplayOutfitsStyles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Navbar } from "components/elements/Navbar";

interface DisplayOutfitsProps {}

const DisplayOutfits: React.FC<DisplayOutfitsProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const action = useDispatch();

  const { outfits } = useSelector((state: RootState) => state.outfit);
  useEffect(() => {
    action(getAllOutfits());
  }, []);

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
