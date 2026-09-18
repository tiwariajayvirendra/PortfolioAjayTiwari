import React from "react";
import profilePic from "../assets/ajaytiwari.jpg";

const highlights = [
  { label: "10+ projects shipped", value: "Full-stack apps" },
  { label: "2+ internships", value: "Startup-driven experience" },
  { label: "100% focus", value: "Secure and scalable builds" },
];

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-10 sm:pt-16">
      <div className="section-shell">
        <div className="glass-card overflow-hidden px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
                Available for modern web projects
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                I build polished digital experiences that feel fast, secure, and human.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                I’m Tiwari Ajay Virendra, a BCA student and full-stack developer crafting React, Node, and cloud-ready apps with strong UX and dependable backend architecture.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#crud" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:scale-[1.02]">
                  Let’s connect
                </a>
                <a href="/projects" className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-center font-semibold text-slate-100 transition hover:bg-white/20">
                  View projects
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="pill">React + Tailwind</span>
                <span className="pill">Node + Express</span>
                <span className="pill">Firebase + MongoDB</span>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-500/10">
              <img src={profilePic} alt="Tiwari Ajay Virendra" className="h-40 w-40 rounded-full border-4 border-cyan-400/30 object-cover shadow-lg shadow-cyan-500/20" />
              <div className="mt-6 space-y-2 text-sm text-slate-300">
                <p className="text-lg font-semibold text-white">Tiwari Ajay Virendra</p>
                <p>BCA Student · Full-stack developer · MERN specialist</p>
                <a href="tel:+919956927789" className="block text-cyan-300 transition hover:text-cyan-200">+91 99569 27789</a>
                <a href="mailto:ajaytripathi821@gmail.com" className="block text-cyan-300 transition hover:text-cyan-200">ajaytripathi821@gmail.com</a>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-lg font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-slate-400">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
