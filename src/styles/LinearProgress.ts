import { LinearProgress } from "@material-ui/core";
import { styled } from "config/theme";

export const TopLinearProgress = styled(LinearProgress)`
  && {
    position: absolute;
    z-index: 999;
    left: 0;
    right: 0;
    top: 0;
  }
`;
