if (localStorage.getItem("token") == null) {
  window.location.href = "login.html";
}
let socket;

const input = document.getElementById("message");
const sendButton = document.getElementById("send");

const spinBg = document.querySelector(".spin-bg");
spinBg.style.display = "block";
axios
  .get("/api/usuarios/current", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then(function (response) {
    const user = response.data.user;
    input.addEventListener("keyup", (event) => {
      if (event.key === "Enter" && input.value !== "" && user.value !== "") {
        sendMessage(event, user);
      }
    });
    sendButton.addEventListener("click", (event) => {
      if (input.value !== "" && user.value !== "") {
        sendMessage(event, user);
      }
    });
    socket = io();
    socket.on("messages", (messages) => {
      document.getElementById("messages").innerHTML = "";
      for (let i = 0; i < messages.length; i++) {
        createMessage(messages[i]);
      }
    });
  })
  .catch((error) => {
    alert("Error al cargar el chat");
    window.location.href = "/";
  })
  .finally(() => {
    spinBg.style.display = "none";
  });

const sendMessage = (event, user) => {
  event.preventDefault();
  socket.emit("sendMessage", { user: user.id, text: input.value });
  input.value = "";
};

const createMessage = (message) => {
  const div = document.createElement("div");
  const finalMessage = cleanString(message.text);
  const finalUser = cleanString(message.user.email);

  const date = new Date(message.created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const createdAt = `${day}/${month}/${year} ${hour}:${minute}`;

  div.innerHTML = `<p><span class="text-primary fw-bold">${finalUser}</span> <span class="text-brown">[${createdAt}]</span>: <span class="text-success fst-italic">${finalMessage}</span></p>`;
  document.getElementById("messages").appendChild(div);
};

const cleanString = (string) => {
  const tmpDiv = document.createElement("div");
  tmpDiv.innerHTML = string;
  const cleanedString = tmpDiv.textContent || tmpDiv.innerText;
  tmpDiv.remove();
  return cleanedString;
};
