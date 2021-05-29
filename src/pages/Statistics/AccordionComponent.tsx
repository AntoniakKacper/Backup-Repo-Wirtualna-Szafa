import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { MostUsedCloth } from "store/types/outfitTypes";

const StyledAccordion = styled(Accordion)`
  width: 100%;
`;

const Image = styled.img`
  padding-top: 25px;
`;

interface AccordionComponentProps {
  title: string;
  content?: number;
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
        {mostUsedCloth ? (
          <div>
            <p>
              <strong>Name: </strong>
              {mostUsedCloth.cloth!.name}
            </p>
            <p>
              <strong>Category: </strong>
              {mostUsedCloth.cloth!.category}
            </p>
            <Image src={mostUsedCloth.cloth!.imageUrl} alt="" />
          </div>
        ) : mostUsedCloth === null ? (
          <Typography>There are no outfits added</Typography>
        ) : (
          <Typography>
            Number of {name} in your wardrobe is equal to:{" "}
            <strong>{content}</strong>
          </Typography>
        )}
      </AccordionDetails>
    </StyledAccordion>
  );
};
