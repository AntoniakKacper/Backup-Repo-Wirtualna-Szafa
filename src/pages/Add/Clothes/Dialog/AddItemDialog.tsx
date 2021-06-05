import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SuccessSnackbar } from "components/elements/SuccessSnackbar";
import { FormikInput } from "components/shared/FormikInput";
import { FormikSelect } from "components/shared/FormikSelect";
import { Formik } from "formik";
import { categories, Cloth } from "models/cloth.model";
import React, { SetStateAction, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { addCloth } from "store/actions/clothActions";
import {
  DialogFormContainer,
  StyledDialogActions,
  StyledDialogContent,
} from "styles/Dialog";
import * as Yup from "yup";
import { ColorPicker } from "./ColorPickerPopper";
import { DropzoneComponent } from "./DropzoneComponent";

const validationSchema = Yup.object({
  name: Yup.string().required().max(20),
  category: Yup.string().required(),
  imageUrl: Yup.string().required(),
  color: Yup.string().required(),
});

interface AddItemDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
}

export const AddItemDialog: React.FC<AddItemDialogProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const initialState: Cloth = {
    id: "",
    name: "",
    imageUrl: "",
    userId: user!.id,
    category: "",
    color: "",
  };

  return (
    <>
      <Formik
        initialValues={initialState}
        validateOnChange={true}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          action(addCloth(data));
          setOpenDialog(false);
          resetForm();
        }}
      >
        {({ handleSubmit, isValid, setFieldValue, resetForm }) => (
          <Dialog open={openDialog}>
            <DialogTitle>Add item</DialogTitle>
            <DialogFormContainer onSubmit={handleSubmit}>
              <StyledDialogContent>
                <DropzoneComponent setFieldValue={setFieldValue} />
                <FormikInput name="name" label="Name" required />
                <FormikSelect
                  name="category"
                  label="Category"
                  options={categories}
                  required
                />

                <ColorPicker setFieldValue={setFieldValue} />
              </StyledDialogContent>
              <StyledDialogActions>
                <Button
                  color="secondary"
                  onClick={() => {
                    setOpenDialog(false);
                    resetForm();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  disabled={!isValid}
                >
                  Add item
                </Button>
              </StyledDialogActions>
            </DialogFormContainer>
          </Dialog>
        )}
      </Formik>
    </>
  );
};
