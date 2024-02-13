import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
// import { ToastContainer } from "react-toastify"
import React, { useEffect, useState } from "react";
function App() {
  const navigate = useNavigate();
  const storedUserData = localStorage.getItem("userData");
  useEffect(() => {
    if (storedUserData) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [storedUserData]);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
