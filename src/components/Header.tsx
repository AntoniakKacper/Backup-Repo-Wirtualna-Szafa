import Avatar from "@material-ui/core/Avatar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "../styles/themes/StyledComponentsTheme";
import { database } from "../database/firebase";
import { ReactComponent as LogoSVG } from "../images/Logo.svg";
import { RootState } from "../store";
import { UserSettingsDialog } from "./UserSettingsDialog";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const ClickableAvatar = styled(Avatar)`
  &:hover {
    cursor: pointer;
  }
`;

export const Header: React.FC = () => {
  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getAvatarUrl();

    return () => {
      setImageUrl("");
    };
  }, []);

  const getAvatarUrl = async () => {
    await database
      .collection("Users")
      .doc(user?.id)
      .onSnapshot((snapshot) => {
        const result = snapshot.data();
        setImageUrl(result?.imageUrl);
      });
  };

  return (
    <Wrapper>
      <LogoSVG height="30px" width="30px" />
      {authenticated ? (
        <ClickableAvatar src={imageUrl} onClick={() => setOpen(true)} />
      ) : (
        <p>Wardrobe</p>
      )}
      <UserSettingsDialog openDialog={open} setOpenDialog={setOpen} />
    </Wrapper>
  );
};
