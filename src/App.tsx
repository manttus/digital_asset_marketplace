import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Marketplace from "./pages/Marketplace";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./routes/AuthRoute";

const App = () => {
  const metaMaskHandler = () => {};

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar metaMaskHandler={metaMaskHandler} />,
      children: [
        {
          path: "home",
          element: <Marketplace />,
        },
      ],
    },
    {
      path: "/signin",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <RegisterPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
