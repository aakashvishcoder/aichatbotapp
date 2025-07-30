import React from 'react';


const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}
        >
          <span>{msg.message}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
