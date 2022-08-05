import React, { useState } from 'react';
import './MessageInput.scss';

const NewMessage = ({ socket, identity, destination }) => {
  const [value, setValue] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    const messageDetail = {
      input: value,
      user: { name: identity },
      destination: destination,
    }
    socket.emit('message', messageDetail);
    setValue('');
  };

  return (
    <form onSubmit={submitForm}>
      <input
        className='form-control w-100'
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