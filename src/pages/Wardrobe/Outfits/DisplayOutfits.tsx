import { MenuItem } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Navbar } from "components/elements/Navbar";
import { SuccessSnackbar } from "components/elements/SuccessSnackbar";
import { ReactComponent as OutfitImage } from "images/outfit.svg";
import { occasions, weather } from "models/cloth.model";
import { Info } from "pages/Add/Clothes/styles/AddClothesStyles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from "react-router-dom";
import { RootState } from "store";
import { getAllOutfits } from "store/actions/outfitActions";
import { Outfit } from "store/types/outfitTypes";
import { OutfitCard } from "./OutfitCard";
import {
  FilterAccordion,
  FiltersContainer,
  NoOutfitsInfo,
  StyledButton,
  Wrapper,
} from "./styles/DisplayOutfitsStyles";
import { StyledInput } from "./styles/OutfitCardStyles";
import AccordionSummary from "@material-ui/core/AccordionSummary";

interface DisplayOutfitsProps {}

const DisplayOutfits: React.FC<DisplayOutfitsProps> = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const action = useDispatch();
  const [selectedOccasion, setSelectedOccasion] = React.useState("");
  const [selectedWeather, setSelectedWeather] = React.useState("");

  const { outfits } = useSelector((state: RootState) => state.outfit);
  const [userOutfits, setUserOutfits] = useState(
    outfits.filter((outfit) => outfit.userId === user?.id)
  );

  const filterByWeather = (event: any) => {
    let filteredOutfits = userOutfits.filter(
      (outfit) => outfit.weather === event.target.value
    );
    setUserOutfits(filteredOutfits);
    setSelectedWeather(event.target.value);
  };

  const filterByOccasion = (event: any) => {
    let filteredOutfits = userOutfits.filter(
      (outfit) => outfit.occasion === event.target.value
    );
    setUserOutfits(filteredOutfits);
    setSelectedOccasion(event.target.value);
  };

  const clearFilters = () => {
    setUserOutfits(outfits.filter((outfit) => outfit.userId === user?.id));
    setSelectedWeather("");
    setSelectedOccasion("");
  };

  useEffect(() => {
    setUserOutfits(outfits.filter((outfit) => outfit.userId === user?.id));
    console.log("test");
  }, [outfits]);

  useEffect(() => {
    action(getAllOutfits());
  }, [action]);

  return (
    <>
      <Navbar path="/wardrobe" />
      <Wrapper>
        {userOutfits.length !== 0 ? (
          <>
            <FilterAccordion>
              <AccordionSummary expandIcon={<FilterListIcon />}>
                Filters
              </AccordionSummary>
              <AccordionDetails>
                <FiltersContainer>
                  <StyledInput variant="outlined">
                    <InputLabel>Weather</InputLabel>
                    <Select
                      value={selectedWeather}
                      onChange={filterByWeather}
                      label="Weather"
                    >
                      {weather.map((item: string, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledInput>
                  <StyledInput variant="outlined">
                    <InputLabel>Occasion</InputLabel>
                    <Select
                      value={selectedOccasion}
                      onChange={filterByOccasion}
                      label="Occasion"
                    >
                      {occasions.map((item: string, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledInput>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                </FiltersContainer>
              </AccordionDetails>
            </FilterAccordion>
            <h2>My outfits</h2>
            {userOutfits.map((outfit: Outfit) => (
              <OutfitCard
                setOpen={setOpen}
                outfit={outfit}
                key={outfit.id}
                myOutfits={true}
                withLike={true}
              />
            ))}
          </>
        ) : (
          <NoOutfitsInfo>
            <OutfitImage width="70px" height="70px" />
            <Info>{`There are no outfits added`}</Info>
            <Link to="/addOutfits">
              <StyledButton color="secondary">Add outfits</StyledButton>
            </Link>
          </NoOutfitsInfo>
        )}
      </Wrapper>
      <SuccessSnackbar
        open={open}
        setOpen={setOpen}
        message="Outfit has been successfully deleted"
      />
    </>
  );
};

export default DisplayOutfits;
