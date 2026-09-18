import React from "react";

const skillGroups = [
  {
    title: "Machine Learning & NLP",
    accent: "from-cyan-500/20 to-blue-500/20",
    bullets: ["Decision Trees, Random Forest, KNN", "Logistic Regression, Naive Bayes", "Tokenization, TF-IDF preprocessing", "Sentiment Analysis & Text Classification"],
  },
  {
    title: "Frameworks & Tools",
    accent: "from-emerald-500/20 to-lime-500/20",
    bullets: ["Scikit-learn & NLTK", "NumPy, Pandas, Matplotlib", "Python & JavaScript", "SQL & Core Data Structures"],
  },
  {
    title: "Data Engineering",
    accent: "from-violet-500/20 to-fuchsia-500/20",
    bullets: ["End-to-End ETL Pipelines", "Apache Airflow workflow mapping", "Data Cleaning & Quarantine Logic", "MySQL & MongoDB schema management"],
  },
  {
    title: "DevOps & Cloud",
    accent: "from-amber-500/20 to-orange-500/20",
    bullets: ["Docker containment & Hub distribution", "GitHub Actions CI/CD automation", "Flask microservice deployment", "Prompt Engineering (Cursor, Gemini)"],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Skills</p>
          <h2 className="section-title">A modern stack with practical depth.</h2>
          <p className="section-subtitle mx-auto sm:mx-0">The work blends product thinking, backend stability, and polished UI to keep projects dependable and impressive.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${group.accent} p-6 backdrop-blur-xl`}>
              <h3 className="text-xl font-semibold text-white">{group.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {group.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
