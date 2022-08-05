const users = new Map();

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.emit("me", socket.id);
        socket.on("identity", (data) => {
            if (!users.has(data.identity)) users.set(data.identity, [socket.id, socket.id]);
            else {
                const tmp = users.get(data.identity);
                tmp[1] = socket.id;
                users.set(data.identity, tmp);
            }
            this.identity = data.identity;
        })
        socket.on('callUser', (data) => {
            io.to(users.get(data.userToCall)[0]).emit("callUser", { signal: data.signalData, from: users.get(data.from)[1], name: data.name })
        });
        socket.on('callEnded', () => {
            socket.broadcast.emit("callEnded")
        });
        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal)
        })
        socket.on("disconnect", () => users.delete(this.identity))
    }
}

function videoChat(io) {
    io.on("connection", (socket) => {
        new Connection(io, socket);
    })
}

module.exports = videoChat;