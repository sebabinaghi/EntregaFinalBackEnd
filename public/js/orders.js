if (localStorage.getItem("token") == null) {
  window.location.href = "login.html";
}
const spinBg = document.querySelector(".spin-bg");
spinBg.style.display = "block";
axios
  .get("/api/pedidos/mis-ordenes", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then((response) => {
    const orders = response.data.payload;
    const ordersDiv = document.getElementById("orders");

    if (orders.length > 0) {
      document.getElementById("orderAmount").innerHTML =
        "Total ordenes generadas: " + orders.length;
      orders.forEach((order) => {
        let totalPrice = 0;
        let tablaProductos =
          '<table class="table"><tr><th></th><th>Titulo</th><th>Precio Individual</th><th>Cantidad</th><th>Precio Total</th></tr>';
        order.productos.forEach((product) => {
          totalPrice += product.price * product.amount;
          tablaProductos += `
            <tr>
                <td><img src="${product.thumbnail}" width="50px" /></td>
                <td>${product.title}</td>
                <td>${product.amount}</td>
                <td>${product.price}</td>
                <td>${
                  Math.round(product.price * product.amount * 100) / 100
                }</td>
            </tr>
            `;
        });
        tablaProductos += "</table>";

        const orderDate = new Date(order.created_at);
        const orderDateString =
          orderDate.getDate() +
          "/" +
          (orderDate.getMonth() + 1) +
          "/" +
          orderDate.getFullYear() +
          " " +
          orderDate.getHours() +
          ":" +
          orderDate.getMinutes();

        ordersDiv.innerHTML += `
        <div class="card my-3">
            <div class="card-body">
                <h5 class="card-title">Orden N° ${order.id}</h5>
                <p class="card-text">Estado: ${order.state}</p>
                <p class="card-text">Fecha: ${orderDateString}</p>
                <p class="card-text"><b>Total precio: $${
                  Math.round(totalPrice * 100) / 100
                }</b></p>
                ${tablaProductos}
            </div>
        </div>
        `;
      });
    } else {
      ordersDiv.innerHTML = `
        <div class="alert alert-warning" role="alert">
            No tienes ningún pedido
        </div>
        `;
    }
  })
  .catch((error) => {
    alert(error.response.data.message);
  })
  .finally(() => {
    spinBg.style.display = "none";
  });
