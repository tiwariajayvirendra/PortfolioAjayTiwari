import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";
import { Link } from "react-router-dom";

function CrudOperation() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const db = getFirestore(app);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: new Date().toISOString(),
      });
      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("❌ Failed to send message.");
    }
  };

  return (
    <section id="crud" className="py-12 px-4 bg-gradient-to-br from-purple-100 to-blue-100 text-black">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-700">
          📨 Send Me a Message
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-10">
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
            Send Message
          </button>
        </form>

        {/* Admin Link */}
        <div className="text-center mt-6 border-t pt-4">
          <Link to="/admin" className="text-xs text-gray-400 hover:text-purple-600 transition">
            Admin Access
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CrudOperation;