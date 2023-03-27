# Entrega desafio final para Coder House

## Como abrir el proyecto
Primero se deben instalar los paquetes desde NPM con `npm i`
Para correr el proyecto localmente, se debe ejecutar el siguiente comando: `npm run dev`.
También se debe generar y popular un archivo .env, basándose en el archivo .env.example.
Las variables que se deben agregar al archivo .env son: `URL_BASE`, `JWT_SECRET`, `MONGODB_URL` y `PORT`.

La autentificación de usuarios se realiza con la biblioteca passport y JWT. En conjunto, permiten guardar la sesión del usuario e identificarlo. Un usuario puede tener 2 roles: 'admin' y 'user'.

### Funcionamiento del proyecto
Uno entra a la página y si tiene usuario se loguea, y sino se registra ingresando los datos personales del usuario
Luego se procede a elegir los productos, agregarlos al carrito, y en el carrito generar la compra con su respectivo numero de compra
