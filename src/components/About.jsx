import React from "react";

const points = [
  "Build responsive, secure, and scalable web applications with React, Node, and Express.",
  "Design clean interfaces with Tailwind while keeping the backend reliable and easy to maintain.",
  "Blend practical engineering with mentoring so future teams can onboard faster and work smarter.",
];

function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="glass-card p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About me</p>
              <h2 className="section-title mt-3">Thoughtful engineering with a modern feel.</h2>
              <p className="section-subtitle">I combine technical depth with a people-first mindset, building apps that are strong under pressure and pleasant to use every day.</p>
            </div>
            <div className="space-y-4 rounded-[24px] border border-white/10 bg-slate-950/70 p-6 text-slate-300">
              {points.map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                  {point}
                </div>
              ))}
              <p className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm leading-7 text-cyan-100">
                My mission is simple: make modern web development accessible, scalable, and deeply human.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
