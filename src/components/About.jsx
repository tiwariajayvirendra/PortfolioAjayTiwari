import React from "react";

function About() {
  return (
    <section id="about" className="px-6 md:px-20 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">🚀 Featured Story</h2>
      <div className="text-gray-700 leading-relaxed space-y-4 text-md md:text-lg">
        <p>
          Hii I’m <span className="font-semibold text-blue-700">Tiwari Ajay Virendra</span>, a BCA student and Fullstack Web Developer with a deep love for scalable systems and clean UI. My journey began with curiosity and evolved into crafting production-ready MERN stack applications that empower users and interns alike.
        </p>
        <p>
          I specialize in building responsive, modular, and performant web apps using <span className="font-semibold">MongoDB, Express, React, and Node.js</span>, styled with <span className="font-semibold">Tailwind CSS</span>. Every line of code I write is designed to be teachable, reusable, and onboarding-friendly.
        </p>
        <p>
          Beyond the tech, I believe in legacy-driven development—creating utilities, documentation, and workflows that help future developers thrive. Whether it’s scripting recovery tools, designing UI layouts, or mentoring interns, I bring clarity, empathy, and a growth mindset to every project.
        </p>
        <p>
          My mission is simple: <span className="italic">to make modern web development accessible, scalable, and deeply human.</span> Let’s build systems that teach, empower, and endure.
        </p>
      </div>
    </section>
  );
}

export default About;