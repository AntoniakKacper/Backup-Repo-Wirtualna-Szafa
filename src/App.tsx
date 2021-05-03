import LinearProgress from "@material-ui/core/LinearProgress";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "components/Header";
import { useSelector } from "react-redux";
import "styles/css/global.css";
import { ApplicationRoutes } from "./config/ApplicationRoutes";
import { RootState } from "./store/index";
import { BottomNavbar } from "components/shared/BottomNavbar";

const App: React.FC = () => {
  const { loading, authenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      <Header />
      <Router>
        <ApplicationRoutes />
        {authenticated && <BottomNavbar />}
      </Router>
    </>
  );
};

export default App;
