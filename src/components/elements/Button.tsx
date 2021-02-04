// import styled from "styled-components";
import { styled } from '../../config/theme';

const Button = styled.button`
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

export default Button;