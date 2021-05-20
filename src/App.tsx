import ApplicationRoutes from "./config/ApplicationRoutes";
import store from "./store/index";
import { Provider } from "react-redux";
import "styles/css/global.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApplicationRoutes />
    </Provider>
  );
};

export default App;
