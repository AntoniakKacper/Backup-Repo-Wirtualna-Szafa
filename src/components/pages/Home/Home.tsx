import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface HomePageState {}
export const Home: React.FC<HomePageState> = () => {
  return <Wrapper></Wrapper>;
};
