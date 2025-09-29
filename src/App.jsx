import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Donate from "./components/Donate.jsx";
// import Resume from "./components/Resume.jsx";      // ✅ Import Resume
import LiveChat from "./components/LiveChat.jsx";  // ✅ Import LiveChat
import CrudOperation from "./components/CrudOperations.jsx"; // ✅ Import CRUD Operation
import Projects from "./components/Projects.jsx"; // ✅ Import Projects Page

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
                <Donate />
              </>
            }
          />

          {/* Projects Page */}
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;