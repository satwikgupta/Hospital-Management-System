import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";


import Navbar from "./components/Navbar";

const App = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/appointment" element={<div>Appointment</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
