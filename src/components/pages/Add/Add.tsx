import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Cloth } from "../../../images/cloth.svg";
import { ReactComponent as Outfit } from "../../../images/outfit.svg";
import { flexCenterXY } from "../../../styles/shared-style";

interface AddProps {}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  width: 100%;
  padding: 20px 20px 96px 20px;
`;

const CategoryTile = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  min-height: 150px;
  border-radius: 20px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
  transition: 0.1s ease-in;
  min-width: 200px;
  min-height: 200px;
  margin-top: 50px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: 0.1s ease-in;
    transform: scale(1.02);
    &:hover span {
      display: none;
    }
    &:before {
      content: attr(data-item);
    }
  }
`;

const ButtonDescription = styled.p`
  padding-top: 20px;
  color: black;
`;

export const Add: React.FC<AddProps> = () => {
  return (
    <Wrapper>
      <Link to="/addOutfits">
        <CategoryTile>
          <Outfit width="100px" height="100px" data-item="Outfits" />
          <ButtonDescription>ADD OUTFITS</ButtonDescription>
        </CategoryTile>
      </Link>

      <Link to="/addClothes">
        <CategoryTile>
          <Cloth width="100px" height="100px" data-item="Outfits" />
          <ButtonDescription>ADD CLOTHES</ButtonDescription>
        </CategoryTile>
      </Link>
    </Wrapper>
  );
};
