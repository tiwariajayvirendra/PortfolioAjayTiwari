import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 py-8">
      <div className="section-shell flex flex-col gap-4 text-center text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>© 2026 Tiwari Ajay Virendra. Built with React, Tailwind, and a secure backend.</p>
        <div className="flex justify-center gap-3 sm:justify-end">
          <a href="https://github.com/tiwariajayvirendra" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-2 transition hover:bg-white/20" aria-label="GitHub">
            <FaGithub size={16} />
          </a>
          <a href="https://www.linkedin.com/in/tiwari-ajay-v/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-2 transition hover:bg-white/20" aria-label="LinkedIn">
            <FaLinkedin size={16} />
          </a>
          <a href="https://www.youtube.com/@tav2" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-2 transition hover:bg-white/20" aria-label="YouTube">
            <FaYoutube size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
