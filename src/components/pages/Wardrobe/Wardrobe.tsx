import React from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";

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
        <Fab variant="extended" color="secondary">
          My outfits
        </Fab>
        <Link to="/categories">
          <Fab variant="extended" color="secondary">
            My clothes
          </Fab>
        </Link>
      </Buttons>
    </Wrapper>
  );
};
