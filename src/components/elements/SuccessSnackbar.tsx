import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React, { SetStateAction } from "react";

interface SuccessSnackbarProps {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({
  open,
  setOpen,
  message,
}) => {
  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
};
