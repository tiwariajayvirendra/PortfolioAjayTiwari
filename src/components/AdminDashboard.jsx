import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("messages");
  const db = getFirestore(app);
  const navigate = useNavigate();

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("❌ Incorrect Password!");
    }
  };

  // Fetch Data
  useEffect(() => {
    if (!isAuthenticated) return;

    const qMsg = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubMsg = onSnapshot(qMsg, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const qDon = query(collection(db, "donations"), orderBy("date", "desc"));
    const unsubDon = onSnapshot(qDon, (snapshot) => {
      setDonations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubMsg();
      unsubDon();
    };
  }, [isAuthenticated]);

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Delete this message?")) {
      await deleteDoc(doc(db, "messages", id));
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition hover:scale-105 duration-300">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Admin Access
          </h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-purple-500 outline-none transition"
          />
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition">
            Unlock Dashboard
          </button>
          <button type="button" onClick={() => navigate("/")} className="w-full mt-4 text-gray-500 hover:text-gray-800 text-sm text-center">
            ← Back to Home
          </button>
        </form>
      </div>
    );
  }

  const totalDonations = donations.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="bg-white w-full md:w-72 p-6 flex flex-col shadow-xl z-10">
        <h2 className="text-2xl font-extrabold mb-10 text-purple-800 tracking-tight">Admin Panel</h2>
        <nav className="flex-1 space-y-3">
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full text-left py-3 px-5 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${
              activeTab === "messages" 
                ? "bg-purple-100 text-purple-700 shadow-inner" 
                : "text-gray-600 hover:bg-gray-50 hover:text-purple-600"
            }`}
          >
            <span>📨</span> Messages <span className="ml-auto bg-purple-200 text-purple-800 text-xs py-1 px-2 rounded-full">{messages.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("donations")}
            className={`w-full text-left py-3 px-5 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${
              activeTab === "donations" 
                ? "bg-green-100 text-green-700 shadow-inner" 
                : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
            }`}
          >
            <span>💰</span> Donations <span className="ml-auto bg-green-200 text-green-800 text-xs py-1 px-2 rounded-full">₹{totalDonations}</span>
          </button>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-100">
          <button onClick={() => setIsAuthenticated(false)} className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition font-semibold text-sm">
            Logout
          </button>
          <button onClick={() => navigate("/")} className="w-full mt-3 text-gray-400 hover:text-gray-600 text-xs text-center">
            Go to Website
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{activeTab} Overview</h1>
          <div className="text-sm text-gray-500">Welcome back, Admin 👋</div>
        </header>

        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {messages.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-300">No messages yet.</div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{msg.name}</h3>
                        <p className="text-xs text-purple-500">{msg.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{new Date(msg.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed">
                    {msg.message}
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="absolute top-4 right-4 bg-white text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="Delete Message"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "donations" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-5 font-semibold">Date</th>
                    <th className="p-5 font-semibold">Amount</th>
                    <th className="p-5 font-semibold">Payment ID</th>
                    <th className="p-5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
                  {donations.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-gray-400">No donations recorded yet.</td></tr>
                  ) : (
                    donations.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-5">{new Date(d.date).toLocaleString()}</td>
                        <td className="p-5 font-bold text-green-600 text-base">₹{d.amount}</td>
                        <td className="p-5 font-mono text-xs text-gray-500 bg-gray-50 rounded w-fit inline-block my-2 mx-5">{d.paymentId}</td>
                        <td className="p-5">
                          <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-semibold shadow-sm">
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;