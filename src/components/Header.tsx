import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "../config/theme";
import { database, storage } from "../database/firebase";
import { ReactComponent as LogoSVG } from "../images/Logo.svg";
import { RootState } from "../store";
import { signout } from "../store/actions/authActions";
import { flexCenterXY } from "../styles/shared-style";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

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

const ClickableAvatar = styled(Avatar)`
  &:hover {
    cursor: pointer;
  }
`;

const Username = styled.p`
  padding-top: 15px;
  font-size: 14px;
`;

const Email = styled.p`
  font-size: 12px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  })
);

export const Header: React.FC = () => {
  const classes = useStyles();
  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const action = useDispatch();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    handleUpload();
    getAvatarUrl();

    return () => {
      setImageUrl("");
      setImage(undefined);
    };
  }, [image]);

  const getAvatarUrl = async () => {
    await database
      .collection("Users")
      .doc(user?.id)
      .onSnapshot((snapshot) => {
        const result = snapshot.data();
        setImageUrl(result?.imageUrl);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.files !== null && setImage(e.target.files[0]);
  };

  const setAvatarUrl = (image: File) => {
    storage
      .ref("AvatarImages")
      .child(image.name)
      .getDownloadURL()
      .then((url) => {
        database.collection("Users").doc(user?.id).update({
          imageUrl: url,
        });

        setProgress(0);
        setImage(undefined);
      });
  };

  const handleUpload = () => {
    if (image !== undefined) {
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
          setAvatarUrl(image);
        }
      );
    }
  };

  return (
    <Wrapper>
      <LogoSVG height="30px" width="30px" />
      {authenticated ? (
        <ClickableAvatar src={imageUrl} onClick={() => setOpen(true)} />
      ) : (
        <p>Wardrobe</p>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
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
                  <IconButton
                    color="secondary"
                    component="span"
                    // onClick={handleUpload}
                  >
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
              <Avatar src={imageUrl} className={classes.large} />
            </Badge>
            <Username>{user?.username}</Username>
            <Email>{user?.email}</Email>
          </UserInfo>
          <DialogActions>
            <Button
              onClick={() => action(signout())}
              color="secondary"
              variant="contained"
              endIcon={<ExitToAppIcon></ExitToAppIcon>}
            >
              Logout
            </Button>
          </DialogActions>
        </DialogWrapper>
      </Dialog>
    </Wrapper>
  );
};
