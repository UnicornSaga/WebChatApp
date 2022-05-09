import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import ChatBubble from 'react-chat-bubble';
import Ava1 from "../../Assets/ava1.png";
import Ava2 from "../../Assets/ava2.png";
import './Messages.scss';

function Messages({ socket, email, from, messages, setMessages }) {
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
  
    /* const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    }; */
  
    socket.on('message', messageListener);
    // socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      // socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  const filterMessage = () => {
    const tmp = messages.filter((message) => {
      if ((message.from == email && message.destination == from) || (message.from == from && message.destination == email)) {
        return message;
      }
    })
    console.log(tmp);
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
      <ChatBubble messages={filterMessage()} className="chat" />
    </div>
  );
}

export default Messages;