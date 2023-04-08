import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

type AuthRouteProps = {
  NextRoute: JSX.Element;
  LoginRoute: JSX.Element;
};

const AuthRoute = ({ NextRoute, LoginRoute }: AuthRouteProps) => {
  const user = useSelector(selectCurrentUser);
  return user ? NextRoute : LoginRoute;
};

export default AuthRoute;
