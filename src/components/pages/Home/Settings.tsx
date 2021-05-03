import React from "react";
import styled from "styled-components";
import { flexCenterXY } from "../../../styles/shared-style";
import Button from "@material-ui/core/Button";
import { signout } from "../../../store/actions/authActions";
import { useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

interface SettingsProps {}
const Wrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
  width: 100%;
  padding: 20px 20px 96px 20px;
`;

export const Settings: React.FC<SettingsProps> = ({}) => {
  const action = useDispatch();
  return (
    <Wrapper>
      <Button
        color="secondary"
        variant="contained"
        endIcon={<EditIcon></EditIcon>}
        size="large"
      >
        Change Username
      </Button>
      <Button
        color="secondary"
        variant="contained"
        endIcon={<EditIcon></EditIcon>}
        size="large"
      >
        Change Password
      </Button>
      <Button
        onClick={() => action(signout())}
        color="secondary"
        variant="contained"
        size="large"
        endIcon={<ExitToAppIcon></ExitToAppIcon>}
      >
        Logout
      </Button>
    </Wrapper>
  );
};
