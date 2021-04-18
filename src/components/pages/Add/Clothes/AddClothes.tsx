import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Cloth } from "../../../../images/cloth.svg";
import { flexCenterXY } from "../../../../styles/shared-style";
import { AddItem } from "./AddItem";

interface AddClothesProps extends RouteComponentProps<{ category: string }> {}
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

const AddButton = styled(Fab)`
  && {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 30px;
    margin-bottom: 80px;
  }
`;
export const AddClothes: React.FC<AddClothesProps> = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Wrapper>
      <BackArrow to="/add">
        <ArrowBackIosIcon fontSize="large" />
      </BackArrow>

      <NoItemsAdded>
        <Cloth width="70px" height="70px" />
        <Info>{`There are no items added`}</Info>
      </NoItemsAdded>
      <AddButton
        color="secondary"
        aria-label="add"
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </AddButton>
      <AddItem openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Wrapper>
  );
};
