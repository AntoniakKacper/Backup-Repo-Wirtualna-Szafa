import { Navbar } from "components/elements/Navbar";
import { ReactComponent as OutfitImage } from "images/outfit.svg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Info } from "pages/Add/Clothes/styles/AddClothesStyles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { filterOutfits, getAllOutfits } from "store/actions/outfitActions";
import { Outfit } from "store/types/outfitTypes";
import { OutfitCard } from "./OutfitCard";
import {
  NoOutfitsInfo,
  StyledButton,
  Wrapper,
} from "./styles/DisplayOutfitsStyles";
import { SuccessSnackbar } from "components/elements/SuccessSnackbar";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { weather } from "models/cloth.model";
import { MenuItem } from "@material-ui/core";
import { StyledInput } from "./styles/OutfitCardStyles";

interface DisplayOutfitsProps {}

const DisplayOutfits: React.FC<DisplayOutfitsProps> = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const action = useDispatch();
  const [selectValue, setSelectValue] = React.useState("");
  const { outfits } = useSelector((state: RootState) => state.outfit);

  const userOutfits = outfits.filter((outfit) => outfit.userId === user?.id);

  const handleChange = (event: any) => {
    setSelectValue(event.target.value);
    if (event.target.value !== "all") {
      user && action(filterOutfits("weather", event.target.value, user.id));
    } else {
      action(getAllOutfits());
    }
  };

  useEffect(() => {
    action(getAllOutfits());

    return () => setSelectValue("");
  }, [action]);

  return (
    <>
      <Navbar path="/wardrobe" />
      <Wrapper>
        <StyledInput variant="outlined">
          <InputLabel>Weather</InputLabel>
          <Select value={selectValue} onChange={handleChange} label="Weather">
            {weather.map((item: string, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
            <MenuItem value="all">Show All</MenuItem>
          </Select>
        </StyledInput>
        {userOutfits.length !== 0 ? (
          <>
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
