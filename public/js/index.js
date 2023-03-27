if (localStorage.getItem("token") == null) {
  window.location.href = "login.html";
}

const spinBg = document.querySelector(".spin-bg");

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
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
    const cart = response.data.cart;
    document.getElementById("greeting").innerHTML = "Bienvenido " + user.name;

    axios
      .get("/api/pedidos/mis-ordenes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        const orders = response.data.payload;
        if (orders.length > 0) {
          document
            .getElementById("buttons")
            .appendChild(document.createElement("a")).innerHTML =
            '<a href="orders.html" class="btn btn-warning">Ver Mis Pedidos</a>';
        }
      });

    if (isAdmin) {
      document
        .getElementById("buttons")
        .appendChild(document.createElement("a")).innerHTML =
        '<a href="add-product.html" class="btn btn-secondary">Agregar Producto</a>';
    }

    axios
      .get("/api/productos")
      .then(function (response) {
        const products = response.data.payload;
        if (products.length > 0) {
          let content = "";
          products.forEach(function (product) {
            content += `
          <div class="col-sm-4">
            <div class="card">
              <img class="card-img-top" src="${
                product.thumbnail
              }" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">Precio: $ ${product.price} - Stock: ${
              product.stock
            }</p>
                <button href="#" class="btn btn-primary buy" data-id="${
                  product.id
                }">Agregar a carrito</button>
                <a href="product.html?producto=${
                  product.id
                }" class="btn btn-info">Ver producto</a>
                ${
                  isAdmin
                    ? `<a href="/edit.html?producto=${product.id}" class="btn btn-success edit">Editar</a> <button href="#" class="btn btn-danger delete" data-id="${product.id}">Eliminar</button> `
                    : ""
                }
              </div>
            </div>
          </div>
        `;
          });
          document.getElementById("productos").innerHTML =
            "<div class='row'>" + content + "</div>";

          const buttonsBuy = document.getElementsByClassName("buy");
          for (let i = 0; i < buttonsBuy.length; i++) {
            buttonsBuy[i].addEventListener("click", function () {
              const productId = this.dataset.id;
              spinBg.style.display = "block";
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
          }

          if (isAdmin) {
            const buttonsDelete = document.getElementsByClassName("delete");
            for (let i = 0; i < buttonsDelete.length; i++) {
              buttonsDelete[i].addEventListener("click", function () {
                const productId = this.dataset.id;
                spinBg.style.display = "block";
                axios
                  .delete("/api/productos/" + productId, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  })
                  .then(function (response) {
                    if (response.data.code === 200) {
                      alert("Producto eliminado");
                      window.location.reload();
                    } else {
                      alert("Error al eliminar el producto");
                    }
                  })
                  .catch(function (error) {
                    alert("Error al eliminar el producto");
                  })
                  .finally(() => {
                    spinBg.style.display = "none";
                  });
              });
            }
          }
        } else {
          document.getElementById("productos").innerHTML =
            "<h2>No hay productos</h2>";
        }
      })
      .catch(function (error) {
        alert("Error al obtener los productos");
      });
  })
  .catch(function (error) {
    alert("No tiene permisos para esta accion");
    localStorage.removeItem("token");
    location.href = "login.html";
  })
  .finally(function () {
    spinBg.style.display = "none";
  });
