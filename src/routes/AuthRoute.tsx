import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const AuthRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AuthRoute;
