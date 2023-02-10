import { useRoutes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
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
      path: "/verify",
      element: <VerifyPage />,
    },
  ]);

  return routes;
};

export default App;
