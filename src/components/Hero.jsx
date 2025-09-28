import React from "react";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-100 to-green-100 px-6">
      {/* Profile picture placeholder */}
      <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 shadow-lg"></div>

      {/* Name and intro */}
      <h1 className="text-4xl font-bold text-gray-900">Tiwari Ajay Virendra</h1>
      <p className="text-lg text-gray-700 mt-2">BCA Student · Fullstack Web Developer · MERN Specialist</p>
      <p className="text-md text-gray-600">Crafting scalable web apps with Tailwind CSS, React, and Express</p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-800">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-blue-600">10+ Projects</h2>
          <p>Built and deployed fullstack apps with MongoDB, React, and Node.js</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-green-600">2+ Internships</h2>
          <p>Hands-on experience in startup environments and agile teams</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-purple-600">50+ Git Commits</h2>
          <p>Active contributor to open-source and collaborative dev workflows</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex space-x-4">
        <a href="#projects" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          View Projects
        </a>
        <a href="#contact" className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-600 hover:text-white transition">
          Connect with Me
        </a>
      </div>
    </section>
  );
}

export default Hero;