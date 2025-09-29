import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function LiveChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    const payload = { message, timestamp: new Date().toISOString() };
    socket.emit("send_message", payload);
    setChat((prev) => [...prev, payload]);
    setMessage("");
  };

  return (
    <section
      id="livechat"
      className="px-6 md:px-20 py-16 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-black"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-700">
        💬 Live Chat with Ajay
      </h2>

      <div className="max-w-2xl mx-auto bg-white border border-purple-200 rounded-2xl p-8 shadow-2xl">
        {/* Chat window */}
        <div className="h-64 overflow-y-auto mb-6 bg-gradient-to-r from-white to-purple-50 p-4 rounded-xl space-y-3 shadow-inner">
          {chat.length === 0 ? (
            <p className="text-gray-500 text-center italic">
              No messages yet. Start the conversation!
            </p>
          ) : (
            chat.map((msg, i) => (
              <div
                key={i}
                className="text-sm text-gray-800 bg-white p-3 rounded-lg shadow-md border border-purple-100"
              >
                <span className="font-semibold text-purple-600">Visitor:</span>{" "}
                {msg.message}
              </div>
            ))
          )}
        </div>

        {/* Input and send */}
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 placeholder-purple-400"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition"
          >
            Send
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Messages are forwarded to{" "}
          <span className="font-semibold text-purple-600">ajay@example.com</span>
        </p>
      </div>
    </section>
  );
}

export default LiveChat;