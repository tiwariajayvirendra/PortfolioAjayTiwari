import React from "react";

function Skills() {
  return (
    <section
      id="skills"
      className="px-6 md:px-20 py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-black"
    >
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-12 animate-pulse">
        🛠️ Tech - Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Frontend */}
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-blue-700 mb-3">Frontend Development</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm">
            <li>React.js with modular component architecture</li>
            <li>Tailwind CSS for scalable, responsive UI</li>
            <li>HTML5 & CSS3 with semantic structure</li>
            <li>JavaScript ES6+ with onboarding clarity</li>
            <li>Used AI – For speed and saved more time</li>
          </ul>
        </div>

        {/* Backend */}
        <div className="p-6 bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-green-700 mb-3">Backend Engineering</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm">
            <li>Node.js with Express.js routing and middleware</li>
            <li>RESTful API design and validation</li>
            <li>Authentication & session management</li>
            <li>Error handling and logging utilities</li>
          </ul>
        </div>

        {/* Database */}
        <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-50 border border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-purple-700 mb-3">Database & Storage</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm">
            <li>MongoDB with Mongoose schema modeling</li>
            <li>MySQL with relational joins and CLI recovery</li>
            <li>Data validation and sanitization</li>
            <li>Legacy-grade onboarding scripts for DB resets</li>
          </ul>
        </div>

        {/* Teaching & Documentation */}
        <div className="p-6 bg-gradient-to-r from-red-100 to-yellow-50 border border-red-200 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-red-600 mb-3">Teaching & Documentation</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm">
            <li>Bilingual code explanations (Hindi-English)</li>
            <li>API documentation for intern onboarding</li>
            <li>Modular walkthroughs for scalable team growth</li>
            <li>Legacy-focused utilities and onboarding clarity</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;