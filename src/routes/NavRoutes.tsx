import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import MintPage from "../pages/MintPage";
import ForgotPassword from "../pages/ForgotPassword";
import RegisterPage from "../pages/RegisterPage";
import ArchivesPage from "../pages/ArchivesPage";
import ProfilePage from "../pages/ProfilePage";

export const NavRoutes = [
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
    path: "forgot",
    element: <ForgotPassword />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "mint",
    element: <MintPage />,
  },
  {
    path: "archive",
    element: <ArchivesPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
];
