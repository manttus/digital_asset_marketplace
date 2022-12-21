import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, setCredintials } from "./authSlice";
import HomePage from "../../pages/HomePage";

const RequireAuth = (props: any) => {
  const accessToken = useSelector(selectCurrentToken);
  console.log(accessToken);
  const location = useLocation();

  // useEffect(() => {
  //   setToken(JSON.parse(localStorage.getItem("Tokens")!).accessToken);
  //   if (token) {
  //   }
  //   const decoded: any = jwt_decode(
  //     JSON.parse(localStorage.getItem("Tokens")!).accessToken
  //   );

  //   dispatch(setCredintials({ ...accessToken, user: decoded._id }));
  // }, []);

  return accessToken ? (
    <HomePage />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;
