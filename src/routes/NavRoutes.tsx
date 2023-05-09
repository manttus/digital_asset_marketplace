import LandingPage from "../pages/LandingPage";
import MintPage from "../pages/MintPage";
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
    path: "archive/:id",
    element: <CategoryPage />,
  },
  {
    path: "details",
    element: <AssetDetails />,
  },
];

export default NavRoutes;
