import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { Context } from "./main";


import Navbar from "./components/Navbar";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/appointment" element={<div>Appointment</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
