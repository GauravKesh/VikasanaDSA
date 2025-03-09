import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import DashBoard from "./components/DashBoard.jsx";
import Problem from "./components/Problem.jsx";

const PublicRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/home" /> : element;
};

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<PublicRoute element={<Signup />} />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/home" element={<ProtectedRoute element={<DashBoard />} />} />
        <Route path="/problem" element={<ProtectedRoute element={<Problem />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;