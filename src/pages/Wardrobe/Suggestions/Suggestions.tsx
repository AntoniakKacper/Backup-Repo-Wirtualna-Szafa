import Fab from "@material-ui/core/Fab";
import { Navbar } from "components/elements/Navbar";
import React from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import { WeatherCloudy } from "@styled-icons/fluentui-system-filled/WeatherCloudy";
import { Heart } from "@styled-icons/entypo/Heart";
import { StarFill } from "@styled-icons/bootstrap/StarFill";

import { flexCenterXY } from "styles/shared-style";

interface WardrobeProps {}

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 400px;
  flex-direction: column;
`;

const ButtonTile = styled.div`
  ${flexCenterXY}
  color: black;
  flex-direction: column;
  min-height: 150px;
  border-radius: 20px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
  transition: 0.1s ease-in;
  min-width: 150px;
  min-height: 150px;
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Cloud = styled(WeatherCloudy)`
  color: #bbdefb;
  width: 100px;
  height: 100px;
`;

const Star = styled(StarFill)`
  color: #ffca28;
  width: 100px;
  height: 100px;
`;

const HeartIcon = styled(Heart)`
  color: #ff3d00;
  width: 100px;
  height: 100px;
`;
const Suggestions: React.FC<WardrobeProps> = () => {
  return (
    <Wrapper>
      <Navbar path="/wardrobe" />
      <Buttons>
        <Link to="/weather">
          <ButtonTile>
            <Cloud />
            <p>Weather</p>
          </ButtonTile>
        </Link>

        <Link to="/likes">
          <ButtonTile>
            <HeartIcon width="100px" height="100px" />
            <p>Likes</p>
          </ButtonTile>
        </Link>
        <Link to="/ocassions">
          <ButtonTile>
            <Star width="100px" height="100px" />
            <p>Occassion</p>
          </ButtonTile>
        </Link>
      </Buttons>
    </Wrapper>
  );
};

export default Suggestions;
