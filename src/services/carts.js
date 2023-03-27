import GenericQueries from "./GenericQueries.js";

export default class CartService extends GenericQueries {
  constructor(dao) {
    super(dao, "Carts");
  }

  getAll = async (options) => {
    return this.dao.getAll(options, "Carts", "user");
  };

  getOne = async (options) => {
    return this.dao.getOne(options, "Carts", "user");
  };
}
