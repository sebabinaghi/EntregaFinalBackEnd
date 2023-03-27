class ProductDto {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.code = product.code;
    this.stock = product.stock + ' Unidades';
    this.price = product.price;
    this.thumbnail = product.thumbnail;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
    this.category = product.category;
  }
}

export default ProductDto;
