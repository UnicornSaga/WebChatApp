import React, { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import Ava1 from "../../Assets/ava1.png";
import Ava2 from "../../Assets/ava2.png";
import './Messages.scss';

function Messages({ socket, email, from, messages, setMessages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const messageListener = (message) => {
      if (message.user.name !== email && message.user.name !== from) return;
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.push({
          "type": message.user.name == email ? 0 : 1,
          "image": message.user.name == email ? Ava1 : Ava2,
          "text": message.value,
          from: message.user.name,
          destination: message.destination,
        })
        return newMessages;
      });
    };
  
    socket.on('message', messageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);

  const filterMessage = () => {
    const tmp = messages.filter((message) => {
      if ((message.from == email && message.destination == from) || (message.from == from && message.destination == email)) {
        return message;
      }
    })
    return tmp;
  }


  return (
    <div className="message-list">
      {/* {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className="user">{message.user.name}:</span>
            <span className="message">{message.value}</span>
            <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
          </div>
        ))
      } */}
      
      <ChatBubble messages={filterMessage()}  dummy={<div ref={messagesEndRef}/>} />
    </div>
  );
}

export default Messages;