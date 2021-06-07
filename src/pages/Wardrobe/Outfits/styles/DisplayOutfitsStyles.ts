import styled from 'styled-components';
import {flexCenterXY} from 'styles/shared-style';
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

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

export const FiltersContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    flex-direction: column;
    min-height: 200px;
`;

export const FilterAccordionDetails = styled(AccordionDetails)`
    &&{
        display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    flex-direction: column;
    min-height: 200px;
    }
`;

export const FilterAccordion = styled(Accordion)`
    &&{
        
        box-shadow: none;
        margin-bottom: 20px;
        width: 330px;
    }
`;

