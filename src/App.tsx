import GlobalStyle from "./styles/GlobalStyle";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { theme } from "./config/theme";

import { Login } from "./components/pages/Login/Login";
import { Register } from "./components/pages/Register/Register";
import { ForgotPassword } from "./components/pages/ForgotPassword/ForgotPassword";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
