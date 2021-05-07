import { createGlobalStyle } from "styled-components";
import Montserrat from "./fonts/Montserrat-Regular.ttf";

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        outline: none;
    }

    @font-face {
        font-family: 'Montserrat';
        src: url(${Montserrat}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    img {
    width: 100%;
    }

    a{
        text-decoration: none;
    }

    body {  
        font-family: 'Montserrat', sans-serif;
        -webkit-font-smoothing: antialiased;
        -webkit-osx-font-smoothing: greyscale;
        line-height: 1.6;
        overflow-x: hidden;
    }
`;

export default GlobalStyle;
