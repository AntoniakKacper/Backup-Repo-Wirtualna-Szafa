import { styled } from "config/theme";
import { flexCenterXY } from "styles/shared-style";
import { Form } from "formik";

export const AuthWrapper = styled.div`
  ${flexCenterXY}
  flex-direction: column;
`;

export const AuthForm = styled(Form)`
  ${flexCenterXY}
  width: 250px;
  flex-direction: column;

  padding-top: 100px;
  padding-bottom: 100px;
`;

export const AuthActions = styled.div`
  && {
    margin-top: 50px;
  }
`;
