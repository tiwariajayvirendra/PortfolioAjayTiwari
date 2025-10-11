import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // your server URL

function LiveChat() {
  const [senderMsg, setSenderMsg] = useState("");
  const [receiverMsg, setReceiverMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [userRole, setUserRole] = useState("Sender"); // you can dynamically set this later

  // receive messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("delete_for_everyone", (ids) => {
      // remove deleted messages for all clients
      setChat((prev) => prev.filter((msg) => !ids.includes(msg.id)));
    });

    return () => {
      socket.off("receive_message");
      socket.off("delete_for_everyone");
    };
  }, []);

  const sendMessage = (message, role) => {
    if (!message.trim()) return;
    const payload = {
      id: Date.now(),
      message,
      role,
      timestamp: new Date().toISOString(),
    };
    socket.emit("send_message", payload);
    setChat((prev) => [...prev, payload]);
    if (role === "Sender") setSenderMsg("");
    else setReceiverMsg("");
  };

  const toggleSelect = (id) => {
    setSelectedMessages((prev) =>
      prev.includes(id)
        ? prev.filter((msgId) => msgId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteClick = () => {
    if (selectedMessages.length > 0) setShowDeleteOptions(true);
  };

  // 🔹 Delete for me — removes only local user’s messages
  const deleteForMe = () => {
    setChat((prev) =>
      prev.filter(
        (msg) =>
          !selectedMessages.includes(msg.id) ||
          msg.role !== userRole // only remove user's own selected messages
      )
    );
    setSelectedMessages([]);
    setShowDeleteOptions(false);
  };

  // 🔹 Delete for everyone — remove for both users via socket event
  const deleteForEveryone = () => {
    socket.emit("delete_for_everyone", selectedMessages);
    setChat((prev) => prev.filter((msg) => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setShowDeleteOptions(false);
  };

  const cancelDelete = () => setShowDeleteOptions(false);

  return (
    <section className="px-4 sm:px-6 md:px-20 py-16 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-black min-h-screen relative">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-purple-700">
        Live Chat (Sender ↔ Receiver)
      </h2>

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sender Section */}
        <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-semibold mb-4 text-purple-700 text-center">
            👤 Sender
          </h3>
          <div className="h-64 overflow-y-auto mb-4 bg-gradient-to-r from-white to-purple-50 p-3 rounded-xl shadow-inner space-y-2">
            {chat.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center gap-2 p-2 rounded-lg border text-sm break-words ${
                  msg.role === "Sender"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedMessages.includes(msg.id)}
                  onChange={() => toggleSelect(msg.id)}
                  className="cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-semibold">{msg.role}: </span>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={senderMsg}
              onChange={(e) => setSenderMsg(e.target.value)}
              placeholder="Sender message..."
              className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50"
            />
            <button
              onClick={() => sendMessage(senderMsg, "Sender")}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
            >
              Send
            </button>
          </div>

          <button
            onClick={handleDeleteClick}
            disabled={selectedMessages.length === 0}
            className={`w-full py-2 rounded-xl font-semibold transition ${
              selectedMessages.length > 0
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            🗑 Delete Selected
          </button>
        </div>

        {/* Receiver Section */}
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-semibold mb-4 text-blue-700 text-center">
            💬 Receiver
          </h3>
          <div className="h-64 overflow-y-auto mb-4 bg-gradient-to-r from-white to-blue-50 p-3 rounded-xl shadow-inner space-y-2">
            {chat.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center gap-2 p-2 rounded-lg border text-sm break-words ${
                  msg.role === "Receiver"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedMessages.includes(msg.id)}
                  onChange={() => toggleSelect(msg.id)}
                  className="cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-semibold">{msg.role}: </span>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={receiverMsg}
              onChange={(e) => setReceiverMsg(e.target.value)}
              placeholder="Receiver message..."
              className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
            />
            <button
              onClick={() => sendMessage(receiverMsg, "Receiver")}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Reply
            </button>
          </div>

          <button
            onClick={handleDeleteClick}
            disabled={selectedMessages.length === 0}
            className={`w-full py-2 rounded-xl font-semibold transition ${
              selectedMessages.length > 0
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            🗑 Delete Selected
          </button>
        </div>
      </div>

      {/* 🔸 Delete Options Modal */}
      {showDeleteOptions && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Delete messages?
            </h4>
            <p className="text-sm text-gray-500">
              Choose how you want to delete selected messages.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={deleteForMe}
                className="py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold text-gray-800"
              >
                🗑 Delete for Me
              </button>
              <button
                onClick={deleteForEveryone}
                className="py-2 bg-red-500 hover:bg-red-600 rounded-xl font-semibold text-white"
              >
                🚫 Delete for Everyone
              </button>
              <button
                onClick={cancelDelete}
                className="py-2 bg-blue-100 hover:bg-blue-200 rounded-xl font-semibold text-blue-700"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LiveChat;
