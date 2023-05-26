import { Navigate } from "react-router-dom";
import Dashboard from "../admin/pages/Dashboard";
import Manage from "../admin/pages/Manage";
import Transactions from "../admin/pages/Transaction";

const isAuthenticated = () => {
  const admin = JSON.parse(localStorage.getItem("admin")!);
  return admin ? true : false;
};

const ProtectedRoute = ({
  path,
  element,
}: {
  path: string;
  element: JSX.Element;
}) => {
  return isAuthenticated() ? (
    <>{element}</>
  ) : (
    <Navigate to="/admin/auth" replace={true} />
  );
};

const AdminRoute = [
  {
    path: "/admin/dash",
    element: <ProtectedRoute path={"/admin/dash"} element={<Dashboard />} />,
  },
  {
    path: "/admin/tran",
    element: <ProtectedRoute path={"/admin/tran"} element={<Transactions />} />,
  },
  {
    path: "/admin/manage",
    element: <ProtectedRoute path={"/admin/manage"} element={<Manage />} />,
  },
];

export default AdminRoute;
