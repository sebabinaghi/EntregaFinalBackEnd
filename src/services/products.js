import GenericQueries from './GenericQueries.js';

export default class ProductService extends GenericQueries {
  constructor(dao) {
    super(dao, 'Products');
  }

  getByCategory = async (category) => {
    return this.dao.getAll({ category }, 'Products');
  };
}
