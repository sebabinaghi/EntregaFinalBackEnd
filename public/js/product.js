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
    const cart = response.data.cart;
    const user = response.data.user;
    const isAdmin = user.role === "admin";

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
          document.title = product.title;
          const productDiv = document.getElementById("producto");
          productDiv.innerHTML = `
            <div class="card">
            <div class="card-body">
                <h4 class="card-title">${product.title}</h4>
                <img src="${product.thumbnail}" class="img-fluid" alt="Responsive image" width='200px'>
                <p class="card-text">${product.description}</p>
                <p class="card-text">
                Categoría:
                    <span class="badge bg-primary">
                        ${product.category}
                    </span>
                </p>
                <p class="card-text">
                Código:
                    <span class="badge bg-primary">
                        ${product.code}
                    </span>
                </p>
                <p class="card-text">
                Precio individual:
                    <span class="badge bg-primary">
                        $${product.price}
                    </span>
                </p>
                <p class="card-text">
                Stock:
                    <span class="badge bg-primary">
                        ${product.stock}
                    </span>
                </p>
                <div id="detail-btns">
                    <button href="#" class="btn btn-primary" id="buy" data-id="${product.id}">Agregar a carrito</button>
                </div>
            </div>
        </div>`;

          if (isAdmin) {
            const buttons = document.getElementById("detail-btns");
            buttons.appendChild(
              createButton("Editar", "btn btn-success", "edit", product.id, "a")
            );
            buttons.appendChild(
              createButton("Eliminar", "btn btn-danger", "delete", product.id)
            );

            const deleteBtn = document.getElementById("delete");
            deleteBtn.addEventListener("click", function (e) {
              e.preventDefault();
              spinBg.style.display = "block";
              axios
                .delete(`/api/productos/${product.id}`, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
                .then(function (response) {
                  if (response.data.code === 200) {
                    window.location.href = "/";
                  } else {
                    alert("No se pudo eliminar el producto");
                  }
                })
                .catch(function (error) {
                  alert("No se pudo eliminar el producto");
                })
                .finally(function () {
                  spinBg.style.display = "none";
                });
            });
          }

          const buy = document.getElementById("buy");
          buy.addEventListener("click", function (event) {
            event.preventDefault();
            spinBg.style.display = "block";
            const productId = event.target.dataset.id;
            axios
              .post(
                "/api/carrito/" + cart.id + "/productos",
                {
                  productoId: productId,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then(function (response) {
                if (response.data.code === 200) {
                  alert("Producto agregado al carrito");
                } else {
                  alert("Error al agregar al carrito");
                }
              })
              .catch(function (error) {
                alert("Error al agregar al carrito");
              })
              .finally(() => {
                spinBg.style.display = "none";
              });
          });
        } else {
          window.location.href = "/";
        }
      })
      .catch(function (error) {
        window.location.href = "/";
      })
      .finally(function () {
        spinBg.style.display = "none";
      });
  })
  .catch(function (error) {
    window.location.href = "login.html";
  });

const createButton = (text, className, id, dataId, type = "button") => {
  if (type === "a") {
    const button = document.createElement("a");
    button.href = `/edit.html?producto=${dataId}`;
    button.innerHTML = text;
    button.className = className;
    button.id = id;
    return button;
  } else {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.className = className;
    button.id = id;
    button.dataset.id = dataId;
    return button;
  }
};
