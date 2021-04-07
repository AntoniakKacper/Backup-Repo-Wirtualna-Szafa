import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { flexCenterXY } from "../../../../styles/shared-style";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { storage } from "../../../../database/firebase";

import { ReactComponent as Cap } from "../../../images/cap.svg";
import { ReactComponent as Jacket } from "../../../images/jacket.svg";
import { ReactComponent as Tshirt } from "../../../images/tshirt.svg";
import { ReactComponent as Sneakers } from "../../../images/sneakers.svg";
import { ReactComponent as Watch } from "../../../images/watch.svg";
import { ReactComponent as Pant } from "../../../images/pant.svg";
import { ReactComponent as Hoodie } from "../../../images/hoodie.svg";
import { ReactComponent as Dress } from "../../../images/dress.svg";
import { ReactComponent as Skirt } from "../../../images/skirt.svg";
import { ReactComponent as HighHeeles } from "../../../images/high-heel.svg";
import { ReactComponent as Shorts } from "../../../images/shorts.svg";

interface RouteParams extends RouteComponentProps<{ category: string }> {}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  width: 100%;
  padding-bottom: 96px;
  padding-top: 20px;
`;

const NoItemsAdded = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  margin-top: 100px;
`;

const CategoryImage = styled.img`
  width: 100px;
  height: 100px;
`;

const BackArrow = styled(Link)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-left: 20px;
  color: #757575;
`;

const Info = styled.p`
  color: #757575;
`;

export const Item: React.FC<RouteParams> = ({ match, location }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getCategoryImage();
  }, []);

  const getCategoryImage = () => {
    storage
      .ref(`CategoryImages/${match.params.category.toLowerCase()}.svg`)
      .getDownloadURL()
      .then((url) => setImageUrl(url));
  };

  return (
    <Wrapper>
      <BackArrow to="/addClothes">
        <ArrowBackIosIcon fontSize="large" />
      </BackArrow>

      <NoItemsAdded>
        <CategoryImage src={imageUrl} alt={match.params.category} />
        <Info>{`There are no items added`}</Info>
      </NoItemsAdded>
    </Wrapper>
  );
};
