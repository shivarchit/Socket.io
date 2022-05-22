import { io } from "socket.io-client";
const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

const socket = io("http://localhost:3000");

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