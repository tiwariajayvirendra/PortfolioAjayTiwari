import React from "react";
import { FaLinkedin, FaGithub, FaYoutube, FaXTwitter } from "react-icons/fa6";

// Razorpay checkout function
const openRazorpay = () => {
  const options = {
    key: "rzp_test_yourKeyHere", // Replace with your Razorpay key
    amount: 50000, // ₹500 in paise
    currency: "INR",
    name: "Donate to Ajay",
    description: "Support my learning & projects!",
    handler: function (response) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

function Donate() {
  return (
    <section id="donate" className="px-6 md:px-20 py-16 bg-gradient-to-r from-indigo-50 to-green-50 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">🙏 Support My Journey</h2>
      <p className="text-gray-700 text-md md:text-lg mb-6 max-w-2xl mx-auto">
        Your donation helps me build better projects, mentor interns, and share onboarding clarity with the dev community. Every rupee fuels my mission to make tech accessible and empowering.
      </p>

      {/* Impact tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-sm text-gray-700">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="font-semibold text-blue-600 mb-2">₹100</h3>
          <p>Buys me 1 hour of cloud hosting to test intern projects</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="font-semibold text-green-600 mb-2">₹500</h3>
          <p>Funds a new onboarding utility or recovery script</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="font-semibold text-purple-600 mb-2">₹1000+</h3>
          <p>Supports a full week of mentorship and open-source contributions</p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={openRazorpay}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Donate via Razorpay
      </button>

      {/* Gratitude */}
      <p className="text-sm text-gray-600 mt-6 italic">
        "Every donation reminds me that my work matters. Thank you for believing in me." — Ajay Tiwari
      </p>

      {/* Security note */}
      <p className="text-xs text-gray-500 mt-2">
        Secure payment powered by Razorpay · Suggested ₹500 · You choose the amount
      </p>

      {/* Social Media Cards */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <a
          href="https://www.linkedin.com/in/tiwari-ajay-v/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform text-blue-700 flex flex-col items-center"
        >
          <FaLinkedin size={32} />
          <span className="mt-2 text-sm font-medium">LinkedIn</span>
        </a>
        <a
          href="https://github.com/tiwariajayvirendra"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform text-gray-800 flex flex-col items-center"
        >
          <FaGithub size={32} />
          <span className="mt-2 text-sm font-medium">GitHub</span>
        </a>
        <a
          href="N/A"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform text-black flex flex-col items-center"
        >
          <FaXTwitter size={32} />
          <span className="mt-2 text-sm font-medium">X</span>
        </a>
        <a
          href="N/A"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform text-red-600 flex flex-col items-center"
        >
          <FaYoutube size={32} />
          <span className="mt-2 text-sm font-medium">YouTube</span>
        </a>
      </div>
    </section>
  );
}

export default Donate;