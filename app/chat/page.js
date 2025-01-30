'use client'; // Needed for client-side code in App Router
import { useState, useEffect } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  // Load chat history from localStorage when the component mounts
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory'));
    if (savedHistory) {
      setResponses(savedHistory);
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (responses.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(responses));
    }
  }, [responses]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'You', text: message };
    setResponses((prev) => [...prev, userMessage]); // Show user input

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponses((prev) => [...prev, { sender: 'AI', text: data.reply }]);
    setMessage('');
  };

  return (<>



    <div className="max-w-2xl  mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">AI Chat</h2>
      <div className="space-y-2 border p-3  overflow-y-auto ">
        {responses.map((msg, index) => (
          <p key={index} className={msg.sender === 'AI' ? 'text-blue-600' : 'text-green-600'}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="border p-2 flex-grow rounded-l-lg text-slate-800"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>



    </>);
}
