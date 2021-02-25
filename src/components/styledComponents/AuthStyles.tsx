import { styled } from "../../config/theme";
import { flexCenterXY } from "../../styles/shared-style";
import { Form } from "formik";
import Button from "@material-ui/core/Button";

export const StyledForm = styled(Form)`
  ${flexCenterXY}
  width: 250px;
  flex-direction: column;
  padding-top: 150px;
  padding-bottom: 100px;
`;

export const StyledButton = styled(Button)`
  margin-top: 100px;
`;
