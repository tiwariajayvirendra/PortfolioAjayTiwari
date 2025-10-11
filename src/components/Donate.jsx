import React from "react";
import { FaLinkedin, FaGithub, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Donate = () => {
  const openRazorpay = async () => {
    try {
      // 1️⃣ Create order via backend
      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }), // amount in rupees
      });

      const order = await res.json();

      // 2️⃣ Razorpay checkout options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // must use VITE_ prefix
        amount: order.amount,
        currency: order.currency,
        name: "Donate to Ajay",
        description: "Support my learning & projects!",
        order_id: order.id,
        handler: async function (response) {
          // 🧠 Razorpay returns payment details in the handler callback.
          // We destructure them safely and verify via backend.
          if (!response || !response.razorpay_payment_id) {
            console.error("❌ Razorpay response missing or malformed:", response);
            alert("Payment failed or incomplete. Please try again.");
            return;
          }

          const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          } = response;

          // 3️⃣ Verify payment via backend
          const verifyRes = await fetch("http://localhost:5001/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            }),
          });

          const result = await verifyRes.json();
          if (result.success) {
            alert("✅ Payment Successful! Payment ID: " + razorpay_payment_id);
          } else {
            alert("❌ Payment Verification Failed!");
          }
        },
        prefill: {
          name: "Donor Name",
          email: "donor@example.com",
          contact: "9999999999",
        },
        theme: { color: "#6366f1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("❌ Something went wrong with payment!");
    }
  };

  return (
    <section
      id="donate"
      className="px-6 md:px-20 py-20 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 text-center"
    >
      <h2 className="text-4xl font-extrabold text-purple-700 mb-4 animate-pulse">
         Support My Journey
      </h2>
      <p className="text-gray-700 text-md md:text-lg mb-8 max-w-2xl mx-auto">
        Your donation helps me build better projects, mentor interns, and share onboarding clarity with the dev community.
      </p>

      {/* Impact tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-sm text-gray-700">
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow-lg p-5 border border-blue-200 hover:scale-105 transition">
          <h3 className="font-bold text-blue-600 text-xl mb-2">₹100</h3>
          <p>Buys me 1 hour of cloud hosting to test intern projects</p>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow-lg p-5 border border-green-200 hover:scale-105 transition">
          <h3 className="font-bold text-green-600 text-xl mb-2">₹500</h3>
          <p>Funds a new onboarding utility or recovery script</p>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-pink-50 rounded-xl shadow-lg p-5 border border-purple-200 hover:scale-105 transition">
          <h3 className="font-bold text-purple-600 text-xl mb-2">₹1000+</h3>
          <p>Supports a full week of mentorship and open-source contributions</p>
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={openRazorpay}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-xl hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105"
      >
        💸 Donate via Razorpay
      </button>

      {/* Gratitude & security */}
      <p className="text-sm text-gray-600 mt-8 italic">
        "Every donation reminds me that my work matters. Thank you for believing in me." — Ajay Tiwari
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Secure payment powered by Razorpay · Suggested ₹500 · You choose the amount
      </p>

      {/* Social Media Cards */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <a
          href="https://www.linkedin.com/in/tiwari-ajay-v/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform text-blue-700 flex flex-col items-center"
        >
          <FaLinkedin size={32} />
          <span className="mt-2 text-sm font-medium">LinkedIn</span>
        </a>
        <a
          href="https://github.com/tiwariajayvirendra"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform text-gray-800 flex flex-col items-center"
        >
          <FaGithub size={32} />
          <span className="mt-2 text-sm font-medium">GitHub</span>
        </a>
        <a
          href="N/A"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform text-black flex flex-col items-center"
        >
          <FaXTwitter size={32} />
          <span className="mt-2 text-sm font-medium">X</span>
        </a>
        <a
          href="N/A"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform text-red-600 flex flex-col items-center"
        >
          <FaYoutube size={32} />
          <span className="mt-2 text-sm font-medium">YouTube</span>
        </a>
      </div>
    </section>
  );
};

export default Donate;