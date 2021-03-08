import { ApplicationRoutes } from "./config/ApplicationRoutes";
import { AuthProvider } from "./AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApplicationRoutes />
    </AuthProvider>
  );
};

export default App;
