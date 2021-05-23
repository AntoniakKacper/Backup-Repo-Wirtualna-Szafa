import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { format } from "date-fns";
import React, { SetStateAction, useEffect } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getOutfitsByDate } from "store/actions/outfitActions";
import { StyledDialogContent } from "styles/Dialog";
import { OutfitCard } from "../Wardrobe/Outfits/OutfitCard";

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
  const { calendarOutfits } = useSelector((state: RootState) => state.outfit);

  useEffect(() => {
    user && action(getOutfitsByDate(date, user.id));
  }, [date, user, action]);

  return (
    <Dialog open={openDialog}>
      <DialogTitle>Outfits for current day</DialogTitle>
      <StyledDialogContent>
        <DialogContentText>
          <strong>Choosen date:</strong> {date && format(date, "do MMMM yyyy")}
        </DialogContentText>

        {calendarOutfits.map((outfit) => (
          <OutfitCard key={outfit.id} outfit={outfit} withLike={false} />
        ))}
        {calendarOutfits.filter((outfit) => outfit.userId === user?.id)
          .length === 0 && (
          <div>There are no outfits added for current day</div>
        )}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
