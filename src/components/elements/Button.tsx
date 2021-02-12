import React from "react";
import { styled } from "../../config/theme";

interface ButtonProps {
  children: React.ReactNode;
}

const StyledButton = styled.button`
  appearance: none;
  font-size: 20px;
  color: ${(props) => props.theme.color.wildWatermelon};
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.wildWatermelon};
  padding: 0.25em 0.5em;
  transition: background-color 0.25s, color, 0.25s;

  &:hover {
    background-color: ${(props) => props.theme.color.wildWatermelon};
    color: white;
    cursor: pointer;
  }
`;

export const Button = (props: ButtonProps) => {
  const { children } = props;
  return <StyledButton>{children}</StyledButton>;
};
