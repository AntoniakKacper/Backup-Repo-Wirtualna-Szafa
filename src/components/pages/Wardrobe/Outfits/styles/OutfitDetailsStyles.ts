import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { flexCenterXY } from "styles/shared-style";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "typeface-roboto";

export const Wrapper = styled(Dialog)``;

export const Tittle = styled(DialogTitle)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled(DialogContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > h2 {
    font-family: Roboto;
  }
`;

export const LikesContainer = styled.div`
  ${flexCenterXY};
  padding-top: 10px;
`;

export const Heart = styled(FavoriteIcon)`
  margin-right: 7px;
  && {
    width: 35px;
    height: 35px;
  }
`;
