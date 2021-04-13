import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { SetStateAction } from "react";
import styled from "styled-components";
import "react-dropzone-uploader/dist/styles.css";
import { DropzoneComponent } from "./DropzoneComponent";

interface AddItemProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
}

const StyledButton = styled(Button)`
  font-weight: bold;
  text-transform: none;
`;

export const AddItem: React.FC<AddItemProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  return (
    <Dialog open={openDialog} fullWidth={true} maxWidth="xl">
      <DialogTitle>Add item</DialogTitle>
      <DialogContent>
        <DropzoneComponent />
      </DialogContent>
      <DialogActions>
        <StyledButton color="secondary" onClick={() => setOpenDialog(false)}>
          Close
        </StyledButton>
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={() => setOpenDialog(false)}
        >
          Add item
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};
