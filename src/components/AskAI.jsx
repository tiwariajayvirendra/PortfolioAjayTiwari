import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSend, IoShieldCheckmark, IoClose } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
  transports: ["polling", "websocket"],
  withCredentials: true
});

const AskAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! Main Jigoogle-AI hoon. Aapka shubh naam kya hai?", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ]);

  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsBlinking(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.isAI) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: data.text,
            time: new Date(data.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsTyping(false);
      }
    });

    return () => socket.off("receive_message");
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || text.length > 500) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setIsTyping(true);

    const effectiveName = userName || text;
    if (!userName) {
      setUserName(text);
    }

    socket.emit("send_message", { text, userName: effectiveName });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen((prev) => !prev)} className={`relative flex items-center gap-3 rounded-full border-2 border-cyan-400/40 px-6 py-4 font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all ${isBlinking ? "animate-pulse bg-cyan-500/20" : "bg-gradient-to-r from-slate-900 to-cyan-950"}`}>
        <span className="text-lg">🤖</span>
        <span>Ask AI</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-28 right-8 flex h-[600px] w-[450px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[28px] border border-cyan-400/30 bg-slate-950 shadow-[0_0_60px_rgba(34,211,238,0.2)]">
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10">
                  <RiRobot2Fill className="text-xl text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Jigoogle-AI</h3>
                  <p className="text-xs text-slate-400">Always online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <IoClose size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-950 p-4">
              {messages.map((msg, index) => (
                <div key={`${msg.role}-${index}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${msg.role === "user" ? "bg-cyan-600/25 text-cyan-50" : "bg-white/10 text-slate-200"}`}>
                    {msg.content}
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">{msg.time}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 rounded-2xl bg-white/10 p-3">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" style={{ animationDelay: "0.2s" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-slate-900/95 p-4">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950 p-2">
                <input value={input} onChange={(event) => setInput(event.target.value.slice(0, 500))} onKeyDown={(event) => event.key === "Enter" && handleSend()} placeholder="Ask about my work..." className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none" />
                <span className="text-[10px] text-slate-500">{input.length}/500</span>
                <button onClick={handleSend} className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-2 text-white">
                  <IoSend size={16} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                <IoShieldCheckmark className="text-cyan-400" />
                Secure and connected
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AskAI;
