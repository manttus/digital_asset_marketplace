import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./routes/AuthRoute";
import RequireAuth from "./features/auth/RequireAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredintials } from "./features/auth/authSlice";
import jwt_decode from "jwt-decode";

const App = () => {
  return (
    <Routes>
      <Route path="/login/*" element={<AuthRoute />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<RequireAuth HomePage={HomePage} />} />
    </Routes>
  );
};

export default App;
