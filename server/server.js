const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080", "https://admin.socket.io"]
    }
});

/**new User name space */
const userInfo = io.of("/user");
userInfo.on("connection", socket => {
    console.log(`connected to user namespace ${socket.username}`);
});

/**
 * Setting middleware for socket.io
 */
userInfo.use((socket, next) => {
    if (socket.handshake.auth.token) {
        socket.username = getUsernameFromToken(socket.handshake.auth.token);
        next();/**Telling to move to next middleware */
    } else {
        next(new Error("Send token"));
    }
});

let getUsernameFromToken = (token) => {
    /**
     * do token validation here
     */
    return token;
};


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

    socket.on("ping", (count) => {
        console.log(count);
    });
});

// let customEventFunction = (incomingBody) => {
//     console.log(incomingBody)
//  };
instrument(io, { auth: false });