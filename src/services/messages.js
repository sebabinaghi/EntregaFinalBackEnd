import GenericQueries from "./GenericQueries.js";

export default class MessageService extends GenericQueries {
  constructor(dao) {
    super(dao, "Messages");
  }

  getAll = async (options) => {
    return this.dao.getAll(options, "Messages", "user");
  };

  getOne = async (options) => {
    return this.dao.getOne(options, "Messages", "user");
  };
}
