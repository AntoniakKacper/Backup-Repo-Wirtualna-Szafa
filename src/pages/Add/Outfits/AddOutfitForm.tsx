import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Outfit } from "store/types/outfitTypes";
import { FormikInput } from "components/shared/FormikInput";
import { FormikSelect } from "components/shared/FormikSelect";
import { weather, Cloth, occasions } from "models/cloth.model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { format, parseISO } from "date-fns";
import { addOutfit } from "store/actions/outfitActions";
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { SubmitButton, OutfitForm } from "./styles/AddOutfitFormStyles";

interface AddOutfitFormProps {
  selectedDate: Date | null;
  addedClothes: Cloth[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const validationSchema = Yup.object({
  name: Yup.string().required().max(40),
  weather: Yup.string().required(),
  occasion: Yup.string().required(),
});

export const AddOutfitForm: React.FC<AddOutfitFormProps> = ({
  selectedDate,
  setSelectedDate,
  addedClothes,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const action = useDispatch();
  const history = useHistory();
  const initialState: Outfit = {
    id: "",
    clothesList: [],
    name: "",
    userId: user!.id,
    likesCount: 0,
    likes: [],
    calendarDate: "",
    weather: "",
    occasion: "",
  };
  return (
    <>
      <Formik
        initialValues={initialState}
        validateOnChange={true}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          action(addOutfit({ ...data, clothesList: addedClothes }));
          resetForm();
          history.push("/myOutfits");
        }}
      >
        {({ handleSubmit, isValid, setFieldValue }) => (
          <OutfitForm onSubmit={handleSubmit}>
            <FormikInput name="name" label="Name" required />
            <FormikSelect
              name="weather"
              label="Weather"
              options={weather}
              required
            />
            <FormikSelect
              name="occasion"
              label="Occasion"
              options={occasions}
              required
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="calendarDate"
                disableToolbar
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                label="Add this outfit to calendar"
                value={selectedDate}
                onChange={(value) => {
                  value &&
                    setFieldValue(
                      "calendarDate",
                      format(parseISO(value!.toISOString()), "MM/d/yyyy")
                    );
                  setSelectedDate(value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            {addedClothes.length > 2 && addedClothes.length < 7 && (
              <SubmitButton
                color="primary"
                type="submit"
                disabled={!isValid}
                variant="contained"
              >
                Save
              </SubmitButton>
            )}
          </OutfitForm>
        )}
      </Formik>
    </>
  );
};
