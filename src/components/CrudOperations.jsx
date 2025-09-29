import React, { useState } from "react";

function CrudOperation() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submittedData, setSubmittedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({ name: "", email: "", message: "" });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setFormData(submittedData);
    setIsEditing(true);
  };

  const handleDelete = () => {
    setSubmittedData(null);
    setFormData({ name: "", email: "", message: "" });
    setIsEditing(false);
  };

  return (
    <section id="crud" className="py-12 px-4 bg-gradient-to-br from-purple-100 to-blue-100 text-black">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-700">CRUD Operation</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
          >
            {isEditing ? "Update Data" : "Submit"}
          </button>
        </form>

        {/* Submitted Data Viewer */}
        {submittedData && (
          <div className="mt-10 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Your Submitted Data</h3>
            <p><span className="font-semibold text-purple-700">Name:</span> {submittedData.name}</p>
            <p><span className="font-semibold text-purple-700">Email:</span> {submittedData.email}</p>
            <p><span className="font-semibold text-purple-700">Message:</span> {submittedData.message}</p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit Your Data
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete Your Data
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CrudOperation;