import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { database, storage } from "database/firebase";
import { Statistics } from "pages/Statistics/Statistics";
import React, { SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { signout } from "store/actions/authActions";
import styled from "styled-components";
import { flexCenterXY } from "styles/shared-style";

interface UserSettingsDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
  avatarUrl: string;
}

const DialogWrapper = styled.div`
  ${flexCenterXY};
  flex-direction: column;
  padding-bottom: 15px;
`;

const UserInfo = styled(DialogContent)`
  ${flexCenterXY};
  flex-direction: column;
  padding-bottom: 20px;
`;

const Username = styled.p`
  padding-top: 15px;
  font-size: 14px;
`;

const Email = styled.p`
  font-size: 12px;
`;

const DialogButtons = styled(DialogActions)`
  display: flex;
  flex-direction: column;

  min-height: 100px;
  &.MuiDialogActions-root {
    justify-content: space-around;
  }
`;

const LargeAvatar = styled(Avatar)`
  && {
    width: 150px;
    height: 150px;
  }
`;

export const UserSettingsDialog: React.FC<UserSettingsDialogProps> = ({
  openDialog,
  setOpenDialog,
  avatarUrl,
}) => {
  const action = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [progress, setProgress] = useState(0);

  const updateUserAvatar = (image: File) => {
    storage
      .ref("AvatarImages")
      .child(image.name)
      .getDownloadURL()
      .then((url) => {
        database.collection("Users").doc(user?.id).update({
          imageUrl: url,
        });
        setProgress(0);
      });
  };

  const handleUpload = (image: File) => {
    const uploadTask = storage.ref(`AvatarImages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (image) => {
        const progress = Math.round(
          (image.bytesTransferred / image.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        updateUserAvatar(image);
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.files && handleUpload(e.target.files[0]);
  };

  const handleClose = () => {
    action(signout());
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogWrapper>
        <UserInfo>
          <Badge
            badgeContent={
              <label htmlFor="icon-button-file">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  onChange={handleChange}
                />
                <IconButton color="secondary" component="span">
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </label>
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            overlap="circle"
          >
            <LargeAvatar src={avatarUrl} />
          </Badge>
          <Username>{user?.username}</Username>
          <Email>{user?.email}</Email>
        </UserInfo>

        <DialogContent>
          <Statistics />
        </DialogContent>

        <DialogButtons>
          {/* <Button
            color="secondary"
            variant="contained"
            endIcon={<EditIcon></EditIcon>}
          >
            Change Password
          </Button> */}

          {/* <Button color="secondary" endIcon={<ShowChartIcon></ShowChartIcon>}>
            Check statistics
          </Button> */}

          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            endIcon={<ExitToAppIcon></ExitToAppIcon>}
          >
            Logout
          </Button>
        </DialogButtons>
      </DialogWrapper>
    </Dialog>
  );
};
