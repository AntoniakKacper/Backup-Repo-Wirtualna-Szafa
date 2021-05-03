import "styled-components";
import { theme } from "styles/themes/StyledComponentsTheme";

declare module "styled-components" {
  export interface DefaultTheme extends theme {}
}
