import React, { useState } from 'react';
import './MessageInput.scss';

const NewMessage = ({ socket, identity }) => {
  const [value, setValue] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    const messageDetail = {
      input: value,
      user: { id: socket.id, name: identity },
    }
    console.log(socket.id);
    socket.emit('message', messageDetail);
    setValue('');
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
};

export default NewMessage;