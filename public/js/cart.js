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
    const cartProducts = cart.productos;
    let total = 0;
    let content = "";
    cartProducts.forEach((product) => {
      total += product.price * product.amount;
      content += `
      <tr>
        <td><img src="${product.thumbnail}" width="50px" /></td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.amount}</td>
        <td>${Math.round(product.price * product.amount * 100) / 100}</td>
        <td><button class="btn btn-danger delete" data-id="${
          product.id
        }">Eliminar</button></td>
      </tr>
    `;
    });

    document.getElementById("cart").innerHTML =
      '<table class="table"><tr><th></th><th>Titulo</th><th>Precio Individual</th><th>Cantidad</th><th>Precio Total</th><th>Acciones</th></tr>' +
      content +
      "</table>";
    total = Math.round(total * 100) / 100;
    if (total > 0) {
      const container = document.getElementsByClassName("container")[0];
      const payButton = document.createElement("button");
      payButton.classList.add("btn", "btn-success", "btn-block");
      payButton.innerHTML = "Pagar";
      payButton.id = "pay";

      container.appendChild(payButton);

      document.getElementById("pay").addEventListener("click", () => {
        spinBg.style.display = "block";
        axios
          .post(
            "/api/pedidos",
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            if (response.data.code === 201) {
              alert("Pedido realizado con éxito");
              window.location.href = "orders.html";
            } else {
              alert("Error al realizar el pedido");
            }
          })
          .catch((error) => {
            alert("Error al realizar el pedido");
          })
          .finally(() => {
            spinBg.style.display = "none";
          });
      });
    }
    document.getElementById("total").innerHTML = "Total: $" + total;

    const deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = button.dataset.id;
        spinBg.style.display = "block";
        axios
          .delete("/api/carrito/" + cart.id + "/productos/" + productId, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(function (response) {
            if (response.status === 200) {
              window.location.reload();
            } else {
              alert("Error al eliminar el producto");
            }
          })
          .catch(function (error) {
            alert("Error al eliminar el producto del carrito");
          })
          .finally(() => {
            spinBg.style.display = "none";
          });
      });
    });
  })
  .catch((error) => {
    alert("Error al cargar el carrito");
  })
  .finally(() => {
    spinBg.style.display = "none";
  });
