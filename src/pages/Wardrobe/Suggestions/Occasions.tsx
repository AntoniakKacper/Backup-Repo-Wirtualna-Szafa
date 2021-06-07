import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { OutfitCard } from "pages/Wardrobe/Outfits/OutfitCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { filterOutfits } from "store/actions/outfitActions";
import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";
import { occasions } from "models/cloth.model";
import { Navbar } from "components/elements/Navbar";

interface OccasionsProps {}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

const Tittle = styled.h1`
  margin-bottom: 40px;
`;

const StyledForm = styled(FormControl)`
  && {
    min-width: 200px;
  }
`;

const NoOutfitInfo = styled.p`
  padding-top: 250px;
  color: #757575;
`;

export const Occasions: React.FC<OccasionsProps> = () => {
  const [selectValue, setSelectValue] = React.useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const action = useDispatch();
  const { outfits } = useSelector((state: RootState) => state.outfit);

  const handleChange = (event: any) => {
    setSelectValue(event.target.value);
    user && action(filterOutfits("occasion", event.target.value, user.id));
  };

  useEffect(() => {
    user && action(filterOutfits("occasion", "Casual", user.id));

    return () => setSelectValue("");
  }, []);

  return (
    <>
      <Navbar path="/suggestions" />
      <Wrapper>
        <Tittle>Occasions</Tittle>
        <StyledForm variant="outlined">
          <InputLabel>Occasions</InputLabel>
          <Select value={selectValue} onChange={handleChange} label="Occasions">
            {occasions.map((item: string, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </StyledForm>

        {outfits.length !== 0 ? (
          <OutfitCard outfit={outfits[0]} withLike={false} />
        ) : (
          <NoOutfitInfo>
            There are no outfits added on current occasion
          </NoOutfitInfo>
        )}
      </Wrapper>
    </>
  );
};

export default Occasions;
