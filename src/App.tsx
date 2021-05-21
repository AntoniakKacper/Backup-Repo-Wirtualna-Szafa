import ApplicationRoutes from "./config/ApplicationRoutes";
import store from "./store/index";
import { Provider } from "react-redux";
import "styles/css/global.css";
import Header from "components/elements/Header";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <ApplicationRoutes />
    </Provider>
  );
};

export default App;
