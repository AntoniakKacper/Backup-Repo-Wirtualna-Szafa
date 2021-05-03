import React from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import { flexCenterXY } from "../../../../styles/shared-style";

interface CategoryProps {
  category: string;
  icon: JSX.Element;
}

const CategoryTile = styled.div`
  ${flexCenterXY}
  min-height: 150px;
  border-radius: 20px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
  transition: 0.1s ease-in;
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

export const Category: React.FC<CategoryProps> = ({ category, icon }) => {
  return (
    <Link to={`itemsList/${category}`} key={category}>
      <CategoryTile data-item={category}>
        <span>{icon}</span>
      </CategoryTile>
    </Link>
  );
};
