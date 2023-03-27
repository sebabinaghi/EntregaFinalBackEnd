import GenericQueries from "./GenericQueries.js";

export default class OrderService extends GenericQueries {
  constructor(dao) {
    super(dao, "Orders");
  }

  getAll = async (options) => {
    return this.dao.getAll(options, "Orders", "user");
  };

  getOne = async (options) => {
    return this.dao.getOne(options, "Orders", "user");
  };
}
