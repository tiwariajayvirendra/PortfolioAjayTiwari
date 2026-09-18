import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app, isFirebaseReady } from "../firebase";

function CrudOperation() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill all the fields before sending." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Sending your message securely..." });

    try {
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to reach the secure backend.");
      }

      if (isFirebaseReady) {
        const db = getFirestore(app);
        await addDoc(collection(db, "messages"), {
          ...formData,
          timestamp: new Date().toISOString(),
        });
      }

      setStatus({ type: "success", message: "Message delivered successfully. I will get back soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      if (isFirebaseReady) {
        try {
          const db = getFirestore(app);
          await addDoc(collection(db, "messages"), {
            ...formData,
            timestamp: new Date().toISOString(),
          });
          setStatus({ type: "success", message: "Stored safely through the connected database." });
          setFormData({ name: "", email: "", message: "" });
        } catch (firebaseError) {
          console.error("Firebase fallback failed:", firebaseError);
          setStatus({ type: "error", message: "The message could not be sent right now. Please try again later." });
        }
      } else {
        setStatus({ type: "error", message: "The message could not be sent right now. Please try again later." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="crud" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="glass-card p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
              <h2 className="section-title mt-3">Send a message that feels calm and secure.</h2>
              <p className="section-subtitle">The form is connected to the backend and uses Firebase as a backup when the configuration is available.</p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-500/10">
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="name">Name</label>
                  <input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400" placeholder="Your full name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400" placeholder="Describe your idea or project..." />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting ? "Sending..." : "Send message"}
              </button>

              {status.message ? (
                <p className={`mt-4 text-sm ${status.type === "success" ? "text-emerald-300" : status.type === "error" ? "text-rose-300" : "text-slate-300"}`}>
                  {status.message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CrudOperation;
