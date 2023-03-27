if (localStorage.getItem("token") !== null) {
  window.location.href = "index.html";
}

window.addEventListener("load", function () {
  document.querySelector("#email").focus();
});

const spinBg = document.querySelector(".spin-bg");

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  spinBg.style.display = "block";
  axios
    .post("/api/auth/login", { email, password })
    .then(function (response) {
      if (response.data.code === 200) {
        localStorage.setItem("token", response.data.payload.token);
        window.location.href = "/";
      } else {
        alert(
          response.data.message +
            ". Por favor, revise los datos ingresados e intente nuevamente"
        );
      }
    })
    .catch(function (error) {
      alert(
        error.response.data.message +
          ". Por favor, revise los datos ingresados e intente nuevamente"
      );
    })
    .finally(() => {
      spinBg.style.display = "none";
    });
});
