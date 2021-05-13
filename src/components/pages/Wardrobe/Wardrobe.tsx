import Fab from "@material-ui/core/Fab";
import React from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

interface WardrobeProps {}

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  min-height: 400px;
`;

const Wrapper = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
`;

export const Wardrobe: React.FC<WardrobeProps> = () => {
  return (
    <Wrapper>
      <Buttons>
        <Link to="/myOutfits">
          <Fab variant="extended" color="secondary">
            My outfits
          </Fab>
        </Link>

        <Link to="/myClothes">
          <Fab variant="extended" color="secondary">
            My clothes
          </Fab>
        </Link>
        <Link to="/weather">
          <Fab variant="extended" color="secondary">
            Weather
          </Fab>
        </Link>
      </Buttons>
    </Wrapper>
  );
};
