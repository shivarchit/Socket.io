const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

form.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (!message) return;
    displayMessage(message);
    messageInput.value = "";
});

joinRoomButton.addEventListener("click", e => {
    const room = roomInput.value;
    console.log(room)
});

let displayMessage = (message) => {
    console.log(message);
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("message-container").append(div);
};