if (localStorage.getItem("token") !== null) {
  window.location.href = "index.html";
}

const spinBg = document.querySelector(".spin-bg");

fetch("/prefixes.json")
  .then((response) => response.json())
  .then((data) => {
    let prefixes = data;
    let select = document.getElementById("prefix");
    prefixes.forEach((prefix) => {
      let option = document.createElement("option");
      option.value = prefix.dial_code;
      option.innerText = prefix.name + " | " + prefix.dial_code;
      select.appendChild(option);
    });
  });

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let username = document.getElementById("username").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;

  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }

  let phoneNumber = document.getElementById("phoneNumber").value;
  let address = document.getElementById("address").value;
  let prefix = document.getElementById("prefix").value;
  let avatar = document.getElementById("avatar").files[0];
  let formData = new FormData();
  formData.append("name", name);
  formData.append("surname", surname);
  formData.append("username", username);
  formData.append("age", age);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("phoneNumber", phoneNumber);
  formData.append("address", address);
  formData.append("prefix", prefix);
  formData.append("avatar", avatar);
  spinBg.style.display = "block";
  axios
    .post("/api/auth/register", formData)
    .then((response) => {
      if (response.data.payload && response.data.payload.token) {
        localStorage.setItem("token", response.data.payload.token);
        window.location.href = "/";
      } else {
        alert(
          response.data.message +
            ". Por favor, revise los datos ingresados e intente nuevamente"
        );
      }
    })
    .catch((error) => {
      alert(
        error.response.data.message +
          ". Por favor, revise los datos ingresados e intente nuevamente"
      );
    })
    .finally(() => {
      spinBg.style.display = "none";
    });
});
