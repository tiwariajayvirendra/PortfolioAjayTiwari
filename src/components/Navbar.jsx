import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-700">Tiwari Ajay Virendra's Portfolio</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li><a href="#about" className="hover:text-blue-600 transition">About</a></li>
          <li><a href="#skills" className="hover:text-blue-600 transition">Skills</a></li>
          {/* <li><a href="#resume" className="hover:text-blue-600 transition">Resume</a></li> */}
          <li><a href="#livechat" className="hover:text-blue-600 transition">Live Chat</a></li>
          <li><a href="#donate" className="hover:text-blue-600 transition">Donate</a></li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-6 pb-4 space-y-2 text-gray-700 font-medium">
          <li><a href="#about" onClick={toggleMenu}>About</a></li>
          <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
          {/* <li><a href="#resume" onClick={toggleMenu}>Resume</a></li> */}
          <li><a href="#livechat" onClick={toggleMenu}>Live Chat</a></li>
          <li><a href="#donate" onClick={toggleMenu}>Donate</a></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;