import styled from 'styled-components';
import {flexCenterXY} from 'styles/shared-style';
import Button from "@material-ui/core/Button";

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
