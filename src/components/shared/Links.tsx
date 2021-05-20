import { styled } from "styles/themes/StyledComponentsTheme";
import { flexCenterXY } from "styles/shared-style";
const Links = styled.div`
  ${flexCenterXY}
  flex-direction: column;

  a {
    color: ${(props) => props.theme.color.opium};
  }
`;

export default Links;
