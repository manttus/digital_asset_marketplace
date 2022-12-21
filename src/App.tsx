import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./routes/AuthRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login/*" element={<AuthRoute />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
