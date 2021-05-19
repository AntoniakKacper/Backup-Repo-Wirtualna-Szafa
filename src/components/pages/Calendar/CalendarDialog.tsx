import React, { SetStateAction, useEffect } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getUserOutfits } from "store/actions/outfitActions";
import { RootState } from "store";
import { OutfitCard } from "../Wardrobe/Outfits/OutfitCard";
import { format } from "date-fns";

interface CalendarDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
  date?: Date;
}

export const CalendarDialog: React.FC<CalendarDialogProps> = ({
  openDialog,
  setOpenDialog,
  date,
}) => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { outfits } = useSelector((state: RootState) => state.outfit);

  useEffect(() => {
    user && action(getUserOutfits(user.id));
  }, []);
  return (
    <Dialog open={openDialog}>
      <DialogTitle>Outfits for current day</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <strong>Choosen date:</strong> {date && format(date, "do MMMM yyyy")}
        </DialogContentText>
        {outfits.length !== 0 ? (
          <div>
            {outfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        ) : (
          <div>There are no addded outfits for current date</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
