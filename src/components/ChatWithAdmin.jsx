import React, { useState, useEffect, useRef } from "react";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { app } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { IoSend, IoChevronBack } from "react-icons/io5";
import { useNavigate as useNav } from "react-router-dom";

const ChatWithAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [isJoined, setIsJoined] = useState(false);
  const [chatSessionId, setChatSessionId] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNav();
  const db = getFirestore(app);

  useEffect(() => {
    if (!isJoined || !chatSessionId) return;

    const q = query(
      collection(db, "realtime_support"),
      where("sessionId", "==", chatSessionId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    }, (error) => {
      console.error("Firestore live support error:", error);
    });

    return () => unsubscribe();
  }, [isJoined, chatSessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (userDetails.name.trim()) {
      let sessId = sessionStorage.getItem("support_session_id");
      if (!sessId) {
        sessId = "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
        sessionStorage.setItem("support_session_id", sessId);
      }
      setChatSessionId(sessId);
      setIsJoined(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      sessionId: chatSessionId,
      name: userDetails.name,
      email: userDetails.email,
      text: input,
      role: "User",
      timestamp: new Date().toISOString(),
    };

    setInput("");
    await addDoc(collection(db, "realtime_support"), userMsg);
  };

  if (!isJoined) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-md w-full p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Chat with Ajay Tiwari</h2>
          <p className="text-slate-400 mb-6 text-sm">Introduce yourself to start a real-time conversation.</p>
          <form onSubmit={handleJoin} className="space-y-4">
            <input
              required
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
              placeholder="Your Name"
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            />
            <input
              type="email"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
              placeholder="Email (Optional)"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
            <button className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]">
              Start Chatting
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full text-slate-500 hover:text-slate-300 text-sm transition"
            >
              Cancel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl h-[700px] flex flex-col rounded-[32px] border border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="text-slate-400 hover:text-white transition">
              <IoChevronBack size={24} />
            </button>
            <div>
              <h3 className="text-lg font-bold text-white">Live Support</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Active now</span>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-300 font-bold uppercase tracking-widest">
            {userDetails.name}
          </div>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/40">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl mb-4 border border-white/10">👋</div>
              <h4 className="text-white font-semibold">Welcome to Live Chat!</h4>
              <p className="text-slate-400 text-sm mt-2 max-w-xs">Send a message and I'll get back to you as soon as I see it.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "User" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                msg.role === "User"
                  ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-none"
                  : "bg-white/10 text-slate-200 border border-white/10 rounded-tl-none"
              }`}>
                {msg.text}
                <div className="mt-2 text-[10px] opacity-50 uppercase tracking-widest">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/5 border-t border-white/10">
          <div className="flex gap-3 bg-slate-900 rounded-2xl p-2 border border-white/10 focus-within:border-cyan-500/50 transition">
            <input
              className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white transition hover:scale-105"
            >
              <IoSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAdmin;
