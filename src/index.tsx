import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";
import { ThemeProvider } from "styled-components";
import materialUiTheme from "styles/themes/MuiTheme";
import { styledComponentTheme } from "styles/themes/StyledComponentsTheme";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={materialUiTheme}>
        <ThemeProvider theme={styledComponentTheme}>
          <App />
        </ThemeProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
