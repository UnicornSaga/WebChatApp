const uuidv4 = require('uuid').v4;

const messages = new Set();
const users = new Map();

const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
};

const messageExpirationTimeMS = 5*60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("takeID", (data) => {
      users.set(data.identity, socket.id);
    });
    socket.on('getMessages', () => this.getMessages());
    socket.on('message', (value) => this.handleMessage(value));
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  
  sendMessage(message) {
    this.io.to(users.get(message.destination)).to(users.get(message.user.name)).emit('message', message);
  }
  
  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(temp) {
    const message = {
      id: uuidv4(),
      user: temp.user || defaultUser,
      value: temp.input,
      time: Date.now(),
      destination: temp.destination,
    };

    messages.add(message);
    this.sendMessage(message);

    /* setTimeout(
      () => {
        messages.delete(message);
        this.io.sockets.emit('deleteMessage', message.id);
      },
      messageExpirationTimeMS,
    ); */
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function chat(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);   
  });
};

module.exports = chat;