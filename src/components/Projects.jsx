import React from "react";

const projects = [
  {
    title: "JiGOOGLE Onboarding Portal",
    description: "Modular intern onboarding system with recovery scripts and legacy utilities.",
    link: "https://yourprojectlink.com/onboarding",
    tech: ["React", "Express", "MongoDB", "Tailwind"],
  },
  {
    title: "Live Chat System",
    description: "Socket-powered real-time chat with Razorpay integration and intern clarity.",
    link: "https://yourprojectlink.com/livechat",
    tech: ["Node.js", "Socket.io", "React"],
  },
  {
    title: "CRUD Showcase",
    description: "Frontend CRUD form with edit/delete logic and onboarding-grade UX.",
    link: "https://yourprojectlink.com/crud",
    tech: ["React", "Tailwind"],
  },
];

function Projects() {
  return (
    <section className="px-6 md:px-20 py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-black">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-12 animate-pulse">
        🧩 My Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-xl border border-purple-200 hover:scale-105 transition"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">{project.title}</h3>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:scale-105 transition"
            >
              🔗 Open Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;