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

interface OccassionsProps {}

const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

const StyledForm = styled(FormControl)`
  && {
    min-width: 200px;
  }
`;

export const Occassions: React.FC<OccassionsProps> = () => {
  const [selectValue, setSelectValue] = React.useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const action = useDispatch();
  const { outfits } = useSelector((state: RootState) => state.outfit);

  const handleChange = (event: any) => {
    setSelectValue(event.target.value);
    user && action(filterOutfits("occassion", event.target.value, user.id));
  };

  useEffect(() => {
    user && action(filterOutfits("occassion", "Casual", user.id));

    return () => setSelectValue("");
  }, []);

  return (
    <Wrapper>
      <h1>Occassions</h1>
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
        <p>There are no outfits added</p>
      )}
    </Wrapper>
  );
};

export default Occassions;
