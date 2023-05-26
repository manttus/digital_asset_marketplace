import LandingPage from "../pages/LandingPage";
import MintPage from "../pages/MintPage";
import ArchivesPage from "../pages/ArchivesPage";
import ProfilePage from "../pages/ProfilePage";
import CollectionPage from "../pages/CollectionPage";
import CategoryPage from "../pages/CategoryPage";
import AuthRoute from "./AuthRoute";
import AssetDetails from "../pages/AssetDetails";
import { elements } from "chart.js";
import AboutPage from "../pages/AboutPage";

const NavRoutes = [
  {
    path: "",
    element: <LandingPage />,
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
  {
    path: "profile/:id",
    element: <ProfilePage />,
  },
  {
    path: "collections",
    element: <CollectionPage />,
  },
  {
    path: "archive/:name",
    element: <CategoryPage />,
  },
  {
    path: "details",
    element: <AssetDetails />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
];

export default NavRoutes;
