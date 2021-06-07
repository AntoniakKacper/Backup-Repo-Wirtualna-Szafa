import { Navbar } from "components/elements/Navbar";
import { SuccessSnackbar } from "components/elements/SuccessSnackbar";
import AddedClothItem from "pages/Add/Clothes/AddedClothItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { deleteCloth, getAddedClothes } from "store/actions/clothActions";
import { Cloth } from "store/types/clothTypes";
import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import { StyledInput } from "pages/Wardrobe/Outfits/styles/OutfitCardStyles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from "@material-ui/core";
import { categories } from "models/cloth.model";
import { ColorPicker } from "pages/Add/Clothes/Dialog/ColorPickerPopper";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";

interface DisplayClothesProps {}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  margin: 0px 20px 96px 20px;

  & > h2 {
    padding-bottom: 20px;
  }
`;

const FilterAccordion = styled(Accordion)`
  && {
    box-shadow: none;
    margin-bottom: 20px;
    min-width: 350px;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 150px;
`;

export const FilterAccordionDetails = styled(AccordionDetails)``;

const DisplayClothes: React.FC<DisplayClothesProps> = () => {
  const action = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { userClothes } = useSelector((state: RootState) => state.cloth);
  const [category, setCategory] = useState("");
  const [filteredClothes, setFilteredClothes] = useState(userClothes);

  const clearFilters = () => {
    setFilteredClothes(userClothes);
  };

  const filterByCategory = (event: any) => {
    let clothes = userClothes.filter(
      (cloth) => cloth.category === event.target.value
    );
    setFilteredClothes(clothes);
    setCategory(event.target.value);
  };

  const filterByColor = (color: string) => {
    let clothes = userClothes.filter((cloth) => cloth.color === color);
    setFilteredClothes(clothes);
  };

  const handleDelete = (cloth: Cloth) => {
    action(deleteCloth(cloth));
  };

  useEffect(() => {
    setFilteredClothes(userClothes);
  }, [userClothes]);

  useEffect(() => {
    user && action(getAddedClothes(user.id));
  }, [user, action]);

  return (
    <>
      <Navbar path="/wardrobe" />
      <Wrapper>
        {userClothes.length !== 0 && (
          <FilterAccordion>
            <AccordionSummary expandIcon={<FilterListIcon />}>
              Filters
            </AccordionSummary>
            <AccordionDetails>
              <FiltersContainer>
                <StyledInput variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={filterByCategory}
                    label="Category"
                  >
                    {categories.map((item: string, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledInput>
                <ColorPicker setFilter={filterByColor} />
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
        )}
        <h2>My clothes</h2>

        {filteredClothes &&
          filteredClothes.map((item: Cloth) => (
            <AddedClothItem
              key={item.id}
              cloth={item}
              handleDelete={handleDelete}
              deleteButton={true}
              setOpen={setOpen}
            />
          ))}
      </Wrapper>
      <SuccessSnackbar
        open={open}
        setOpen={setOpen}
        message="Cloth has been successfully deleted"
      />
    </>
  );
};

export default DisplayClothes;
