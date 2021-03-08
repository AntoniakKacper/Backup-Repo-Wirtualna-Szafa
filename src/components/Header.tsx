import React from "react";
//import styled from "styled-components";
import { Link } from "react-router-dom";
import { styled } from "../config/theme";

import { ReactComponent as LogoSVG } from "../images/Logo.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const Name = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  color: black;
  &:hover {
    color: ${(props) => props.theme.color.opium};
  }
`;

export const Header: React.FC = () => {
  return (
    <Wrapper>
      <Name to="/">Wardrobe</Name>
      <Link to="/">
        <LogoSVG height="50px" width="50px" />
      </Link>
    </Wrapper>
  );
};
