import React, { useState, useEffect } from 'react';
import MessageList from './messagelist';
import MessageInput from './messageinput';
import axios from 'axios';
import { saveMessage } from '../firebase'; 

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (userInput) => {
    const userMsg = { sender: 'user', message: userInput };
    setMessages((prev) => [...prev, userMsg]);
    saveMessage('user', userInput); 

    try {
      const response = await axios.post('http://localhost:8000/chat', { message: userInput });
      const botMsg = { sender: 'ai', message: response.data.reply };
      setMessages((prev) => [...prev, botMsg]);
      saveMessage('ai', response.data.reply); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatApp;
