import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./routes/AuthRoute";
import RequireAuth from "./features/auth/RequireAuth";

import ForgotPassword from "./pages/ForgotPassword";
import Marketplace from "./pages/Marketplace";

const App = () => {
  return (
    <Routes>
      <Route path="/login/*" element={<AuthRoute />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<RequireAuth HomePage={HomePage} />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/market" element={<Marketplace />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default App;
