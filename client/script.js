import { io } from "socket.io-client";
const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

const socket = io("http://localhost:3000");
const userSocket = io("http://localhost:3000/user", { auth: { token: "testToken" } });
/**
 * !for throwing error if token not specified
 */
// const userSocket = io("http://localhost:3000/user");

/**
 * !on throwing error
 */
userSocket.on("connect_error", (err) => {
    displayMessage(err);
});

socket.on("connect", () => {
    displayMessage(`Connected with id: ${socket.id}`);

    emitMessageToCustomEvent();
});

socket.on("fetch-message", (obj) => {
    displayMessage(obj.message);
});

function emitMessageToCustomEvent() {
    socket.emit("custom-event", { name: "Client1" });
}

function sendMessageViaSocket(message, room) {
    socket.emit("send-message", { message }, room);
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (!message) return;
    displayMessage(message);
    sendMessageViaSocket(message, room);
    messageInput.value = "";
});

joinRoomButton.addEventListener("click", e => {
    const room = roomInput.value;
    socket.emit("join-room", room, (message) => {
        displayMessage(message);
    });
    console.log(room);
});

let displayMessage = (message) => {
    console.log(message);
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("message-container").append(div);
};


document.addEventListener("keydown", e => {
    if (e.target.matches("input")) return;
    if (e.key === "c") socket.connect();
    if (e.key === "d") socket.disconnect();
});

// let counter = 0;
// setInterval(() => {
//     // socket.emit("ping", counter++);
//     /**
//      * !volatile does not queue up message if disconnected
//      */
//     socket.volatile.emit("ping", counter++);
// }, 1000);