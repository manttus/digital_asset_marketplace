import { useRoutes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Marketplace from "./pages/Marketplace";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./routes/AuthRoute";

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <AuthRoute />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <RegisterPage />,
    },
    {
      path: "/Marketplace",
      element: <Marketplace />,
    },
  ]);

  return routes;
};

export default App;
