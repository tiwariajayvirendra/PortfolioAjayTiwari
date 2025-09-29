import React from "react";

function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-20 py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-black"
    >
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-purple-200">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8 animate-pulse">
          🚀 Featured Story
        </h2>

        <div className="text-gray-800 leading-relaxed space-y-6 text-md md:text-lg">
          <p>
            Hii I’m{" "}
            <span className="font-bold text-blue-600">
              Tiwari Ajay Virendra
            </span>
            , a BCA student and Fullstack Web Developer with a deep love for
            scalable systems and clean UI. My journey began with curiosity and
            evolved into crafting production-ready MERN stack applications that
            empower users and interns alike.
          </p>
          <p>
            I specialize in building responsive, modular, and performant web
            apps using{" "}
            <span className="font-bold text-green-600">
              MongoDB, Express, React, and Node.js
            </span>
            , styled with{" "}
            <span className="font-bold text-purple-600">Tailwind CSS</span>. Every
            line of code I write is designed to be teachable, reusable, and
            onboarding-friendly.
          </p>
          <p>
            Beyond the tech, I believe in{" "}
            <span className="text-pink-600 font-semibold">
              legacy-driven development
            </span>
            —creating utilities, documentation, and workflows that help future
            developers thrive. Whether it’s scripting recovery tools, designing
            UI layouts, or mentoring interns, I bring clarity, empathy, and a
            growth mindset to every project.
          </p>
          <p>
            My mission is simple:{" "}
            <span className="italic text-purple-700">
              to make modern web development accessible, scalable, and deeply
              human.
            </span>{" "}
            Let’s build systems that teach, empower, and endure.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;