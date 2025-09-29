import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Donate from "./components/Donate.jsx";
// import Resume from "./components/Resume.jsx";      // ✅ Import Resume
import LiveChat from "./components/LiveChat.jsx";  // ✅ Import LiveChat
import CrudOperation from "./components/CrudOperations.jsx"; // ✅ Import CRUD Operation

function App() {
  return (
    <div className="bg-white min-h-screen text-black font-sans">
      {/* Navbar at the top */}
      <Navbar />

      {/* Hero section with name & tagline */}
      <Hero />

      {/* About / Featured story section */}
      <About />

      {/* Skills section */}
      <Skills />

      {/* CRUD Operation section */}
      <CrudOperation /> {/* ✅ Add CRUD Operation section */}

      {/* Live chat section */}
      <LiveChat /> {/* ✅ Add LiveChat section */}

      {/* Donate me section with Razorpay */}
      <Donate />
    </div>
  );
}

export default App;