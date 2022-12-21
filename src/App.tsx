import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./routes/AuthRoute";
import RequireAuth from "./features/auth/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/login/*" element={<AuthRoute />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<RequireAuth />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
