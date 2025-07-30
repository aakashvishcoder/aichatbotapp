import React, { useState } from 'react';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    const userMsg = { role: "user", content: userInput };
    setMessages(prev => [...prev, { sender: 'user', message: userInput }]);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        message: userInput
      });

      const reply = response.data.reply;
      setMessages(prev => [...prev, { sender: 'ai', message: reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { sender: 'ai', message: "Something went wrong." }]);
    }

    setUserInput("");
  };

  return (
  <div className="chat-container">
    <div className="chat-window">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}
        >
          {msg.message}
        </div>
      ))}
    </div>

    <div className="input-area">
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);
};

export default ChatApp;
