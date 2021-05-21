import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import { styled } from "config/theme";
import { database } from "database/firebase";
import { ReactComponent as LogoSVG } from "images/Logo.svg";
import { RootState } from "store";
import { UserSettingsDialog } from "./UserSettingsDialog";

const LogoTypography = styled.div`
  font-family: "Parisienne", sans-serif;
  font-size: 32px;
`;

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

const Header: React.FC = () => {
  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const unsubscribe = database
      .collection("Users")
      .doc(user?.id)
      .onSnapshot((snapshot) => {
        const result = snapshot.data();
        setImageUrl(result?.imageUrl);
      });
    return () => {
      unsubscribe();
    };
  }, [imageUrl]);

  return (
    <Wrapper>
      {authenticated ? (
        <Link to="/home">
          <LogoSVG height="30px" width="30px" />
        </Link>
      ) : (
        <LogoSVG height="30px" width="30px" />
      )}

      {authenticated ? (
        <ClickableAvatar src={imageUrl} onClick={() => setOpen(true)} />
      ) : (
        <LogoTypography>Wardrobe</LogoTypography>
      )}
      <UserSettingsDialog
        openDialog={open}
        setOpenDialog={setOpen}
        avatarUrl={imageUrl}
      />
    </Wrapper>
  );
};

export default Header;
