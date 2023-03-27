if (localStorage.getItem("token") == null) {
  window.location.href = "login.html";
}
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
    const isAdmin = user.role === "admin";
    if (!isAdmin) {
      window.location.href = "index.html";
    }
  })
  .catch(function (error) {
    window.location.href = "index.html";
  })
  .finally(function () {
    spinBg.style.display = "none";
  });

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const category = document.getElementById("category").value;

  const thumbnailEl = document.querySelector("#thumbnail");
  const thumbnail = thumbnailEl.files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("description", description);
  formData.append("code", code);
  formData.append("category", category);
  formData.append("thumbnail", thumbnail);
  spinBg.style.display = "block";
  axios
    .post("/api/productos", formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.data.code > 200) {
        alert("Producto agregado");
        window.location.href = "index.html";
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      alert(error.response.data.message);
    })
    .finally(() => {
      spinBg.style.display = "none";
    });
});
