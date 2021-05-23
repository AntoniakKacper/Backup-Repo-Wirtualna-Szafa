import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
import "typeface-roboto";

export const Wrapper = styled(Dialog)`
  
`;

export const Tittle = styled(DialogTitle)`
  ${flexCenterXY};
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  margin-top: 15px;

  & > p {
    padding-left: 8px;
  }
`;


export const BottomContainter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 20px;

`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  
`;

export const Heart = styled(FavoriteIcon)`
  margin-right: 7px;
  &&{
    width: 35px;
    height: 35px;
  }
`;

export const DisplayContainer = styled.div`
  ${flexCenterXY};
  padding-top: 10px;

  & > h4 {
    margin-left: 7px;
  }
`;

