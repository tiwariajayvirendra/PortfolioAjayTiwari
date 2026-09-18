import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
  transports: ["polling", "websocket"],
  withCredentials: true
});

function LiveChat() {
  const [senderMsg, setSenderMsg] = useState("");
  const [receiverMsg, setReceiverMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    socket.on("connect", () => setConnectionStatus("Connected"));
    socket.on("disconnect", () => setConnectionStatus("Disconnected"));

    socket.on("receive_message", (data) => {
      const normalizedMessage = {
        id: data.id || Date.now(),
        text: data.text || data.message || "",
        role: data.role || (data.isAI ? "Jigoogle-AI" : "You"),
        isAI: Boolean(data.isAI),
      };
      setChat((prev) => [...prev, normalizedMessage]);
    });

    socket.on("delete_for_everyone", (ids) => {
      setChat((prev) => prev.filter((msg) => !ids.includes(msg.id)));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
      socket.off("delete_for_everyone");
    };
  }, []);

  const sendMessage = (message, role) => {
    if (!message.trim()) return;
    socket.emit("send_message", { text: message, role });
    if (role === "Sender") setSenderMsg("");
    else setReceiverMsg("");
  };

  const toggleSelect = (id) => {
    setSelectedMessages((prev) => (prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]));
  };

  const handleDeleteClick = () => {
    if (selectedMessages.length > 0) setShowDeleteOptions(true);
  };

  const deleteForMe = () => {
    setChat((prev) => prev.filter((msg) => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setShowDeleteOptions(false);
  };

  const deleteForEveryone = () => {
    socket.emit("delete_for_everyone", selectedMessages);
    setChat((prev) => prev.filter((msg) => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setShowDeleteOptions(false);
  };

  const cancelDelete = () => setShowDeleteOptions(false);

  return (
    <section id="livechat" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Live chat</p>
          <h2 className="section-title">Connected in real time with your secure backend.</h2>
          <p className="section-subtitle mx-auto sm:mx-0">This panel sends messages through the live socket server so the interface and backend stay synced.</p>
        </div>

        <div className="mt-8 flex items-center justify-center sm:justify-start">
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${connectionStatus === "Connected" ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"}`}>
            {connectionStatus}
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Sender</h3>
              <span className="pill">Send</span>
            </div>
            <div className="mt-4 h-72 space-y-3 overflow-y-auto rounded-[20px] border border-white/10 bg-slate-950/70 p-3">
              {chat.map((msg) => (
                <div key={msg.id} className={`rounded-2xl border px-3 py-2 text-sm ${msg.role === "Sender" ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-50" : "border-white/10 bg-white/5 text-slate-200"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedMessages.includes(msg.id)} onChange={() => toggleSelect(msg.id)} className="h-4 w-4 rounded border-slate-400 bg-slate-900" />
                      <span className="font-medium">{msg.role}</span>
                    </label>
                  </div>
                  <p className="mt-2 leading-6">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <input value={senderMsg} onChange={(event) => setSenderMsg(event.target.value)} placeholder="Write a sender message" className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none" />
              <button onClick={() => sendMessage(senderMsg, "Sender")} className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white">Send</button>
            </div>
            <button onClick={handleDeleteClick} disabled={selectedMessages.length === 0} className={`mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold ${selectedMessages.length > 0 ? "bg-rose-500 text-white" : "bg-white/10 text-slate-400"}`}>
              Delete selected
            </button>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Receiver</h3>
              <span className="pill">Reply</span>
            </div>
            <div className="mt-4 h-72 space-y-3 overflow-y-auto rounded-[20px] border border-white/10 bg-slate-950/70 p-3">
              {chat.map((msg) => (
                <div key={msg.id} className={`rounded-2xl border px-3 py-2 text-sm ${msg.role === "Receiver" ? "border-blue-400/20 bg-blue-500/10 text-blue-50" : "border-white/10 bg-white/5 text-slate-200"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedMessages.includes(msg.id)} onChange={() => toggleSelect(msg.id)} className="h-4 w-4 rounded border-slate-400 bg-slate-900" />
                      <span className="font-medium">{msg.role}</span>
                    </label>
                  </div>
                  <p className="mt-2 leading-6">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <input value={receiverMsg} onChange={(event) => setReceiverMsg(event.target.value)} placeholder="Write a receiver message" className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none" />
              <button onClick={() => sendMessage(receiverMsg, "Receiver")} className="rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white">Reply</button>
            </div>
            <button onClick={handleDeleteClick} disabled={selectedMessages.length === 0} className={`mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold ${selectedMessages.length > 0 ? "bg-rose-500 text-white" : "bg-white/10 text-slate-400"}`}>
              Delete selected
            </button>
          </div>
        </div>
      </div>

      {showDeleteOptions && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[24px] border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h4 className="text-lg font-semibold text-white">Delete selected messages?</h4>
            <p className="mt-2 text-sm text-slate-400">Choose whether to remove them for only your view or for everyone connected.</p>
            <div className="mt-5 space-y-3">
              <button onClick={deleteForMe} className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100">Delete for me</button>
              <button onClick={deleteForEveryone} className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white">Delete for everyone</button>
              <button onClick={cancelDelete} className="w-full rounded-2xl bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LiveChat;
