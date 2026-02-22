import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Donate from "./components/Donate.jsx";
import LiveChat from "./components/LiveChat.jsx";
import CrudOperation from "./components/CrudOperations.jsx";
import Projects from "./components/Projects.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
 

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen text-black font-sans">
        {/* Navbar at the top */}
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Skills />
                <CrudOperation />
                <LiveChat />
                <Donate /> {/* Razorpay Donate button integrated */}
                {/* <DonateButton /> */}
              </>
            }
          />

          {/* Projects Page */}
          <Route path="/projects" element={<Projects />} />

          {/* Admin Page */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
