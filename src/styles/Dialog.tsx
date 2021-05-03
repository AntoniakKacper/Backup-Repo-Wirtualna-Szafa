import { DialogActions, DialogContent } from "@material-ui/core";
import { Form } from "formik";
import styled from "styled-components";

export const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 16px 24px;
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  max-height: 500px;
`;

export const DialogFormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
