import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import MintPage from "../pages/MintPage";
import ForgotPassword from "../pages/ForgotPassword";
import RegisterPage from "../pages/RegisterPage";
import ArchivesPage from "../pages/ArchivesPage";
import ProfilePage from "../pages/ProfilePage";
import CollectionPage from "../pages/CollectionPage";
import CategoryPage from "../pages/CategoryPage";
import AuthRoute from "./AuthRoute";
import AssetDetails from "../pages/AssetDetails";

const NavRoutes = [
  {
    path: "",
    element: <LandingPage />,
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
    element: <AuthRoute LoginRoute={<LoginPage />} NextRoute={<MintPage />} />,
  },
  {
    path: "archive",
    element: (
      <AuthRoute LoginRoute={<LoginPage />} NextRoute={<ArchivesPage />} />
    ),
  },
  {
    path: "profile",
    element: (
      <AuthRoute LoginRoute={<LoginPage />} NextRoute={<ProfilePage />} />
    ),
  },
  {
    path: "collections",
    element: <CollectionPage />,
  },
  {
    path: "archive/:id",
    element: (
      <AuthRoute LoginRoute={<LoginPage />} NextRoute={<CategoryPage />} />
    ),
  },
  {
    path: "details",
    element: (
      <AuthRoute LoginRoute={<LoginPage />} NextRoute={<AssetDetails />} />
    ),
  },
];

export default NavRoutes;
