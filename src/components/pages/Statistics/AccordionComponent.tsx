import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { MostUsedCloth } from "../../../store/types/outfitTypes";

const StyledAccordion = styled(Accordion)`
  width: 100%;
`;

interface AccordionComponentProps {
  title: string;
  content: number;
  name?: string;
  mostUsedCloth?: MostUsedCloth | null;
}

export const AccordionComponent: React.FC<AccordionComponentProps> = ({
  title,
  content,
  name,
  mostUsedCloth,
}) => {
  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Number of {name} in your wardrobe is equal to:{" "}
          <strong>{content}</strong>
          {mostUsedCloth && <>{mostUsedCloth.cloth?.name}</>}
        </Typography>
      </AccordionDetails>
    </StyledAccordion>
  );
};