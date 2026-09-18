import React from "react";

const items = [
  {
    role: "Data Science & Generative AI Specialist (In Progress)",
    company: "Codesquadz, Noida",
    period: "Present",
    description: "Deepening technical expertise in Machine Learning, Deep Learning, Natural Language Processing (NLP), and large language model (LLM) workflows.",
    type: "Certification & Training"
  },
  {
    role: "Full Stack Web Development (MERN)",
    company: "DiCE Academy, South Delhi",
    period: "Completed Track",
    description: "Mastered full-stack engineering utilizing MongoDB, Express.js, React.js, and Node.js. Built secure REST APIs, custom session cookies, and interactive layout panels.",
    type: "Certification & Training"
  },
  {
    role: "Master of Computer Applications (MCA)",
    company: "Maharishi Dayanand University | Rawal Institute of Management",
    period: "Pursuing (Session 2026 - 2028)",
    description: "Advanced post-graduation training track focusing on core AI architecture, cloud distribution systems, advanced computational logic, and enterprise product engineering frameworks.",
    type: "Academic Foundation"
  },
  {
    role: "Bachelor of Computer Applications (BCA)",
    company: "Maharishi Dayanand University | Rawal Institute of Management",
    period: "Completed",
    description: "Rigorous academic training covering Data Structures & Algorithms, Database Management Systems (DBMS), Probability & Statistics, Machine Learning frameworks, and Software Engineering.",
    type: "Academic Foundation"
  }
];

function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 bg-transparent text-slate-100">
      <div className="section-shell">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Experience & Journey</p>
          <h2 className="section-title">Academic Foundation & Professional Training Tracks</h2>
          <p className="section-subtitle mx-auto sm:mx-0">
            A strategic balance of computer science foundations, cutting-edge AI/ML model deployment training, and robust full-stack expertise.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {items.map((item, index) => (
            <div key={index} className="glass-card p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:border-cyan-500/20">
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
                  {item.type}
                </span>
                <h3 className="text-xl font-bold text-white">{item.role}</h3>
                <p className="text-sm text-slate-300 font-medium mt-1">{item.company}</p>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed max-w-3xl">{item.description}</p>
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl shrink-0">
                {item.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
