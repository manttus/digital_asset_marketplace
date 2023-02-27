import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import LoginPage from "../pages/LoginPage";

const AuthRoute = () => {
  const user = useSelector(selectCurrentUser);
  return user ? <Marketplace /> : <LoginPage />;
};

export default AuthRoute;
