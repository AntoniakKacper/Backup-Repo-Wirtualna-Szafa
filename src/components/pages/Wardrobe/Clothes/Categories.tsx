import React from "react";
import styled from "styled-components";
import { ReactComponent as Cap } from "../../../../images/cap.svg";
import { ReactComponent as Dress } from "../../../../images/dress.svg";
import { ReactComponent as HighHeeles } from "../../../../images/high-heel.svg";
import { ReactComponent as Hoodie } from "../../../../images/hoodie.svg";
import { ReactComponent as Jacket } from "../../../../images/jacket.svg";
import { ReactComponent as Pant } from "../../../../images/pant.svg";
import { ReactComponent as Shorts } from "../../../../images/shorts.svg";
import { ReactComponent as Skirt } from "../../../../images/skirt.svg";
import { ReactComponent as Sneakers } from "../../../../images/sneakers.svg";
import { ReactComponent as Tshirt } from "../../../../images/tshirt.svg";
import { ReactComponent as Watch } from "../../../../images/watch.svg";
import { flexCenterXY } from "../../../../styles/shared-style";
import { Category } from "./Category";

interface CategroiesProps {}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  width: 100%;
  padding: 20px 20px 96px 20px;
`;

const CategoriesContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1em;
  margin-top: 25px;
`;

export const Categories: React.FC<CategroiesProps> = () => {
  const CategoriesItems = [
    {
      category: "Cap",
      icon: <Cap height={50} />,
    },
    {
      category: "Hoodie",
      icon: <Hoodie height={50} />,
    },
    {
      category: "Tshirt",
      icon: <Tshirt height={50} />,
    },
    {
      category: "Jacket",
      icon: <Jacket height={50} />,
    },
    {
      category: "Pant",
      icon: <Pant height={50} />,
    },
    {
      category: "Shorts",
      icon: <Shorts height={50} />,
    },
    {
      category: "Sneakers",
      icon: <Sneakers height={50} />,
    },
    {
      category: "Accessories",
      icon: <Watch height={50} />,
    },
    {
      category: "Dress",
      icon: <Dress height={50} />,
    },
    {
      category: "Skirt",
      icon: <Skirt height={50} />,
    },
    {
      category: "High-heels",
      icon: <HighHeeles height={50} />,
    },
  ];
  return (
    <Wrapper>
      <h2>All clothes</h2>
      {/* <CategoriesContainer>
        {CategoriesItems.map((item) => {
          return (
            <Category
              category={item.category}
              icon={item.icon}
              key={item.category}
            />
          );
        })}
      </CategoriesContainer> */}
    </Wrapper>
  );
};
