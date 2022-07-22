let username = sessionStorage.getItem("username");

if (username == null) {
  username = prompt("Insert username");
  sessionStorage.setItem("username", username);
}
const nodeUsername = document.getElementById("username");
if (nodeUsername) {
  document.getElementById("username").innerHTML = `Welcome ${username}`;
}

const btnSend = document.getElementById("send");
const socket = io();
if (btnSend) {
  btnSend.onclick = (e) => {
    e.preventDefault();
    const msn = document.getElementById("msn").value;
    socket.emit("chat-in", { msn, username });
    document.getElementById("msn").value = "";
  };
}

socket.on("chat-out", (data) => {
  const div = document.getElementById("chat");
  div.innerHTML += `<br>[${data.time}] <b>${data.username}</b>: <i>${data.msn}</i>`;
});

// const itemSend = document.getElementById("item_send")
// if(itemSend){
//   itemSend.onclick = (e)=>{
//     socket.emit("prod", {saludo: "hola"})
//   }
// }

socket.on("newItem", (data) => {
  const producto = document.getElementById("productList");
  console.log("nvio: ", data);
  const item = `<li class="products__item" id="new">
  <h2> ${data.title} </h2>
  <p>Price : ${data.price}</p>
  <img src="${data.thumbnail}" />
</li>`;
  //producto.insertAdjacentElement("afterbegin", item);
  producto.innerHTML += item;
  const form = document.getElementById("formulario");
  form.reset();
});

const formulario = document.getElementById("formulario");
if (formulario) {
  formulario.addEventListener("submit", (e) => {
    socket.emit("post");
  });
}
