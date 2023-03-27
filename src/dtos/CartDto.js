import ProductDto from "./ProductDto.js";

class CartDto {
  constructor(cart) {
    this.id = cart.id;
    this.productos = cart.productos.map((product) => {
      const productDto = new ProductDto(product);
      productDto.amount = product.amount;
      return productDto;
    });
    this.userId = cart.userId;
    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }
}

export default CartDto;
