import React from "react";

function Skills() {
  return (
    <section id="skills" className="px-6 md:px-20 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">🛠️ Technical Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Frontend */}
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md bg-white">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Frontend Development</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>React.js with modular component architecture</li>
            <li>Tailwind CSS for scalable, responsive UI</li>
            <li>HTML5 & CSS3 with semantic structure</li>
            <li>JavaScript ES6+ with onboarding clarity</li>
          </ul>
        </div>

        {/* Backend */}
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md bg-white">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Backend Engineering</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>Node.js with Express.js routing and middleware</li>
            <li>RESTful API design and validation</li>
            <li>Authentication & session management</li>
            <li>Error handling and logging utilities</li>
          </ul>
        </div>

        {/* Database */}
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md bg-white">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">Database & Storage</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>MongoDB with Mongoose schema modeling</li>
            <li>MySQL with relational joins and CLI recovery</li>
            <li>Data validation and sanitization</li>
            <li>Legacy-grade onboarding scripts for DB resets</li>
          </ul>
        </div>

        {/* DevOps & Tools */}
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md bg-white">
          <h3 className="text-xl font-semibold text-yellow-600 mb-2">DevOps & Utilities</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>Git & GitHub for version control and collaboration</li>
            <li>VS Code customization for intern clarity</li>
            <li>Hostinger deployment and recovery scripting</li>
            <li>Windows service troubleshooting (MySQL, Node)</li>
          </ul>
        </div>

        {/* Teaching & Documentation */}
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md bg-white">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Teaching & Documentation</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>Bilingual code explanations (Hindi-English-Sanskrit)</li>
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