//colors
import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const theme = {
    color: {
        wildWatermelon: '#FF6581',
        opium: '#948282',

    },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

// export const wildWatermelon: DefaultColor = {
//     color: "#FF6581"
// }

// export const wildWatermelon: string = "#FF6581";
// export const defaultFontColor: string = "#948282";


