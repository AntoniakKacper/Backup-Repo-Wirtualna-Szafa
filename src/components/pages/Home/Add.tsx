import React from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";

import styled from "styled-components";

interface AddProps {}

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

export const Add: React.FC<AddProps> = () => {
  return (
    <Wrapper>
      <Buttons>
        <Fab variant="extended" color="secondary">
          <AddBoxIcon fontSize="large" />
          Add outfit
        </Fab>
        <Link to="/addClothes">
          <Fab variant="extended" color="secondary">
            <AddBoxIcon fontSize="large" />
            Add clothes
          </Fab>
        </Link>
      </Buttons>
    </Wrapper>
  );
};
