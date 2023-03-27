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
  });

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const producto = getQueryParam("producto");

axios
  .get(`/api/productos/${producto}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then(function (response) {
    if (response.data.code === 200) {
      const product = response.data.payload;
      document.getElementById("titleProduct").innerHTML =
        "Editando: " + product.title;
      const stock = product.stock.replace(" Unidades", "");
      document.getElementById("title").value = product.title;
      document.getElementById("price").value = product.price;
      document.getElementById("stock").value = stock;
      document.getElementById("description").value = product.description;
      document.getElementById("code").value = product.code;
      document.getElementById("category").value = product.category;
    } else {
      window.location.href = "/";
    }
  })
  .catch(function (error) {
    window.location.href = "/";
  })
  .finally(() => {
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
  if (thumbnail) {
    formData.append("thumbnail", thumbnail);
  }

  spinBg.style.display = "block";
  axios
    .put("/api/productos/" + producto, formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.data.code >= 200) {
        alert("Producto Editado");
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
