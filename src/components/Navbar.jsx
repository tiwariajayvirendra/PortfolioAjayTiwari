import React, { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { label: "Home", href: "#home", sectionId: "home" },
    { label: "About", href: "#about", sectionId: "about" },
    { label: "Skills", href: "#skills", sectionId: "skills" },
    { label: "Experience", href: "#experience", sectionId: "experience" },
    { label: "Donate", href: "#donate", sectionId: "donate" },
    { label: "Message Me", href: "#crud", sectionId: "crud" },
  ];

  const handleNavClick = (event, sectionId) => {
    if (window.location.pathname !== "/") {
      window.location.href = "/" + "#" + sectionId;
      return;
    }
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "home");
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <a href="#home" onClick={(event) => handleNavClick(event, "home")} className="text-lg font-semibold tracking-wide text-white">
          Tiwari Ajay Virendra
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={(event) => handleNavClick(event, link.sectionId)} className={`transition ${activeSection === link.sectionId ? "text-cyan-300" : "hover:text-white"}`}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/chat-with-me" className="ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:scale-105">
              Chat with Me 💬
            </a>
          </li>
        </ul>

        <button className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950/90 px-4 py-4 md:hidden">
          <ul className="space-y-3 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(event) => handleNavClick(event, link.sectionId)} className="block rounded-xl px-3 py-2 hover:bg-white/10">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/chat-with-me" className="block text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md">
                Chat with Me 💬
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
