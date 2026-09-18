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
import AskAI from "./components/AskAI.jsx";
import Footer from "./components/Footer.jsx";
import ChatWithAdmin from "./components/ChatWithAdmin.jsx";
import Experience from "./components/Experience.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-transparent text-slate-100">
        <Navbar />
        <AskAI />

        <main className="pb-14">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Experience />
                  <CrudOperation />
                  <Donate />
                </>
              }
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="/chat-with-me" element={<ChatWithAdmin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
