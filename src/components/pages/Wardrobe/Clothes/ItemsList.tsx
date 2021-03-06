import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import { storage } from "../../../../database/firebase";
import { flexCenterXY } from "../../../../styles/shared-style";

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
  padding-top: 20px;
  color: #757575;
`;

export const ItemsList: React.FC<RouteParams> = ({ match, location }) => {
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
      <BackArrow to="/categories">
        <ArrowBackIosIcon fontSize="large" />
      </BackArrow>

      <NoItemsAdded>
        <CategoryImage src={imageUrl} alt={match.params.category} />
        <Info>{`There are no items added`}</Info>
      </NoItemsAdded>
    </Wrapper>
  );
};
