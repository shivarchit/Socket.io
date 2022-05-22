const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});
io.on("connection", socket => {
    console.log(socket.id);
    socket.on("custom-event", (object) => {
        // console.log("")
    });

    socket.on("send-message", (message, room) => {
        console.log(socket.id, message);
        /**
         * ! broadcasting to all
         * socket.emit("fetch-message", message);   
         */
        if (!room) {
            socket.broadcast.emit("fetch-message", message);
        } else {
            socket.to(room).emit("fetch-message", message);
        }
    });

    socket.on("join-room", (room, callback) => {
        socket.join(room);
        callback(`Joined ${room}`);
    });
});

// let customEventFunction = (incomingBody) => {
//     console.log(incomingBody)
//  };