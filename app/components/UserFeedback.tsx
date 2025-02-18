"use client";

import { useState } from "react";

export default function UserFeedback() {
  const [feedback, setFeedback] = useState([
    { id: 1, message: "Room temperature is perfect!", user: "John Doe" },
    { id: 2, message: "Lights are too bright.", user: "Jane Smith" },
  ]);

  const [newFeedback, setNewFeedback] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.trim() || !username.trim()) return;

    setFeedback([
      ...feedback,
      { id: feedback.length + 1, message: newFeedback, user: username },
    ]);
    setNewFeedback("");
    setUsername("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary">User Feedback</h2>
      
      {/* Feedback List */}
      <div className="space-y-3 text-earth mb-4">
        {feedback.map((item) => (
          <div key={item.id} className="border-b pb-3">
            <p>{item.message}</p>
            <p className="text-sm text-gray-500">- {item.user}</p>
          </div>
        ))}
      </div>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <textarea
          placeholder="Write your feedback..."
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-green-700 transition duration-300"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
