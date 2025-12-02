// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ForgetPassword from "./pages/Forget-password";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-in" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="forget-password" element={<ForgetPassword />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
