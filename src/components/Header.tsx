import React from "react";
import styled from "styled-components";

import { ReactComponent as LogoSVG } from "../images/Logo.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

export const Header: React.FC = () => {
  return (
    <Wrapper>
      <h1>Wardrobe</h1>
      <LogoSVG height="50px" width="50px" />
    </Wrapper>
  );
};
