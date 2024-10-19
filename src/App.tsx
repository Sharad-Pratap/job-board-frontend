import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VerifyOtp from "./pages/VerifyOtp";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import CreateInterview from "./pages/CreateInterview";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-interview" element={<CreateInterview />} />
      </Routes>
    </Router>
  );
}

export default App;
