import { Fab } from "@material-ui/core";
import { styled } from "../../styles/themes/StyledComponentsTheme";

export const FloatingButton = styled(Fab)`
  && {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 50px;
    margin-bottom: 100px;
  }
`;
