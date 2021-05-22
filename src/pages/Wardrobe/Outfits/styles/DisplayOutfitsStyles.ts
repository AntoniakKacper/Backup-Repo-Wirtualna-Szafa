import styled from 'styled-components';
import {flexCenterXY} from 'styles/shared-style';
import Button from "@material-ui/core/Button";

export const Wrapper = styled.div`
  ${flexCenterXY}
  width: 100%;
  padding-bottom: 69px;
  flex-direction: column;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
`;

export const NoOutfitsInfo = styled.div`
    ${flexCenterXY};
    flex-direction: column;
    padding-top: 200px;
    & > p {
        font-size: 16px;
    }
`;

export const StyledButton = styled(Button)`
    &&{
        margin-top: 20px;
    }
`;