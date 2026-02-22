import React, { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    // { label: "Resume", href: "/#resume" }, // Uncomment if needed
    { label: "Live Chat", href: "/#livechat" },
    { label: "Donate", href: "/#donate" },
    { label: "Message Me", href: "/#crud" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-700">Tiwari Ajay Virendra</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`transition ${
                  activeSection === link.href.replace("#", "")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-6 pb-4 space-y-2 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={toggleMenu}
                className={`block transition ${
                  activeSection === link.href.replace("#", "")
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;