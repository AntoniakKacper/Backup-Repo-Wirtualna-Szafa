import Fab from "@material-ui/core/Fab";
import { Navbar } from "components/elements/Navbar";
import React from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

interface WardrobeProps {}

const Buttons = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  min-height: 400px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Wardrobe: React.FC<WardrobeProps> = () => {
  return (
    <Wrapper>
      <Navbar path="/home" />
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
        <Link to="/suggestions">
          <Fab variant="extended" color="secondary">
            Suggestions
          </Fab>
        </Link>
      </Buttons>
    </Wrapper>
  );
};

export default Wardrobe;
