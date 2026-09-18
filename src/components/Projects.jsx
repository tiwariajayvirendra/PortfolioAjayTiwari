import React from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "End-to-End NLP Sentiment Analysis Application",
    description: "Built and deployed a complete NLP pipeline for sentiment classification – text preprocessing, tokenization, feature extraction (TF-IDF), model training, and evaluation as a live Flask product.",
    link: "https://github.com/tiwariajayvirendra",
    tech: ["Python", "NLTK", "Scikit-learn", "Flask", "NLP"],
  },
  {
    title: "30-Task Data ETL Pipeline",
    description: "Designed a comprehensive 30-task ETL workflow on an IPL dataset, implementing extraction, validation, cleaning, quarantine tables, and data lineage tracking using Apache Airflow containerized via Docker.",
    link: "https://github.com/tiwariajayvirendra",
    tech: ["Apache Airflow", "Docker", "Python", "ETL", "Data Engineering"],
  },
  {
    title: "Decision Tree Classification Model",
    description: "Built a Decision Tree classification model covering data preprocessing, feature selection, model training, and evaluation. Tuned hyperparameters to eliminate overfitting and maximize accuracy metrics.",
    link: "https://github.com/tiwariajayvirendra",
    tech: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
  },
  {
    title: "Custom Docker Image Hub",
    description: "Built and published specialized custom Docker images to Docker Hub, mastering image layering, tagging, and versioned releases for reproducible machine learning environments.",
    link: "https://hub.docker.com",
    tech: ["Docker", "Docker Hub", "DevOps"],
  },
  {
    title: "Automated CI/CD Workflows",
    description: "Configured automated GitHub Actions workflows to build, lint, and test application environments on every push, practicing solid CI/CD orchestration to streamline deployment lifecycles.",
    link: "https://github.com/tiwariajayvirendra",
    tech: ["GitHub Actions", "YAML", "Git", "CI/CD"],
  },
  {
    title: "Jigoogle Numbers Onboarding Workspace",
    description: "A modular onboarding experience with recovery utilities and polished internal workflows.",
    link: "https://www.jigoogle.com",
    tech: ["React", "Express", "MySQL", "Tailwind", "Node"],
  },
  {
    title: "Live Chat Support Router",
    description: "Socket-powered real-time messaging with AI support and secure integration patterns.",
    link: "https://tiwariajayvirendra.web.app",
    tech: ["Node.js", "Socket.io", "React"],
  },
];

function Projects() {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/");
  };

  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Projects</p>
            <h2 className="section-title mt-3">Selected work with a strong product focus.</h2>
          </div>
          <button onClick={goToMainPage} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/20">
            ← Back home
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <div key={project.title} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                  Project {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a href={project.link} target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:scale-[1.02]">
                  Open project
                </a>
                <button onClick={goToMainPage} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/20">
                  Back to home
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
