import { useRoutes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
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
  ]);

  return routes;
};

export default App;
