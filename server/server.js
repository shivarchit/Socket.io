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

    socket.on("send-message", (message) => {
        console.log(socket.id, message)
        io.emit("fetch-message", message);        
    });
});

// let customEventFunction = (incomingBody) => {
//     console.log(incomingBody)
//  };