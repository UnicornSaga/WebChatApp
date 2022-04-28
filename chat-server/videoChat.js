class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.emit("me", socket.id);
        socket.on('callUser', (data) => {
            io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
        });
        socket.on('callEnded', () => {
            socket.broadcast.emit("callEnded")
        });
        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal)
        })
    }
}

function videoChat(io) {
    io.on("connection", (socket) => {
        new Connection(io, socket);
    })
}

module.exports = videoChat;