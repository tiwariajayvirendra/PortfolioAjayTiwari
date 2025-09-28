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
    <section id="livechat" className="px-6 md:px-20 py-16 bg-gradient-to-r from-white to-blue-50">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">💬 Live Chat with Ajay</h2>
      <div className="max-w-xl mx-auto bg-white border rounded-xl p-6 shadow-lg">
        {/* Chat window */}
        <div className="h-64 overflow-y-auto mb-4 bg-gray-100 p-4 rounded-lg space-y-3">
          {chat.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          ) : (
            chat.map((msg, i) => (
              <div key={i} className="text-sm text-gray-800 bg-white p-2 rounded shadow-sm">
                <span className="font-semibold text-blue-600">Visitor:</span> {msg.message}
              </div>
            ))
          )}
        </div>

        {/* Input and send */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          Messages are forwarded to <span className="font-semibold">ajay@example.com</span>
        </p>
      </div>
    </section>
  );
}

export default LiveChat;