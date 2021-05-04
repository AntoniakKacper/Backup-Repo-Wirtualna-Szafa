//colors
import baseStyled, { ThemedStyledInterface } from "styled-components";

export const styledComponentTheme = {
  color: {
    wildWatermelon: "#FF6581",
    opium: "#948282",
  },
};

export type Theme = typeof styledComponentTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
