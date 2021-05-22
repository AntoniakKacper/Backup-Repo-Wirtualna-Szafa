import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";
import { OutfitForm } from "./styles/AddOutfitsStyles";

interface AddOutfitFormProps {
  weather: string;
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  handleChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
}

export const AddOutfitForm: React.FC<AddOutfitFormProps> = ({
  selectedDate,
  handleDateChange,
  handleChange,
  weather,
}) => {
  return (
    <OutfitForm>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          label="Add this outfit to calendar"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <FormControl variant="outlined">
        <InputLabel>Weather</InputLabel>
        <Select value={weather} onChange={handleChange} label="Weather">
          <MenuItem value="Hot">Hot</MenuItem>
          <MenuItem value="Warm">Warm</MenuItem>
          <MenuItem value="Cold">Cold</MenuItem>
          <MenuItem value="Rain">Rain</MenuItem>
        </Select>
      </FormControl>
    </OutfitForm>
  );
};
