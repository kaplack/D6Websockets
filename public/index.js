let username = sessionStorage.getItem("username");

if (username == null) {
  username = prompt("Insert username");
  sessionStorage.setItem("username", username);
}

document.getElementById("username").innerHTML = `Welcome ${username}`;

const btnSend = document.getElementById("send");
const socket = io();
btnSend.onclick = (e) => {
  e.preventDefault();
  const msn = document.getElementById("msn").value;
  socket.emit("chat-in", { msn, username });
  document.getElementById("msn").value = "";
};

socket.on("chat-out", (data) => {
  const div = document.getElementById("chat");
  div.innerHTML += `<br>[${data.time}] <b>${data.username}</b>: <i>${data.msn}</i>`;
});
