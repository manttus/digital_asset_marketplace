import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MintPage from "./pages/MintPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: "mint",
          element: <MintPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "mint",
          element: <MintPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
