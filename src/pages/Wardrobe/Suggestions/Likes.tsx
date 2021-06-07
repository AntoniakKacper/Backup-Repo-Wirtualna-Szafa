import { Navbar } from "components/elements/Navbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getMostLikableOutfit } from "store/actions/outfitActions";
import { OutfitCard } from "../Outfits/OutfitCard";
import { Wrapper } from "./Styles/SuggestionsStyles";

interface LikesProps {}

export const Likes: React.FC<LikesProps> = ({}) => {
  const action = useDispatch();
  const { mostLikableOutfit } = useSelector((state: RootState) => state.outfit);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    user && action(getMostLikableOutfit(user.id));
  }, []);
  return (
    <>
      <Navbar path="/suggestions" />
      <Wrapper>
        <h1>Most likable outfit</h1>

        {mostLikableOutfit !== null ? (
          <OutfitCard outfit={mostLikableOutfit} withLike={false} />
        ) : (
          <p>There are no outfits added</p>
        )}
      </Wrapper>
    </>
  );
};

export default Likes;
