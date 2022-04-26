import { Context } from 'apollo-server-core';
import CategoryController from '../../controllers/category.controller';
import { ProductsController } from '../../controllers/products.controller';

const query = {
  getAllProducts: async () => {
    return await ProductsController.getAllProducts();
  },
  getAllCategories: async () => {
    return await CategoryController.getAllCategories();
  },
};

export default query;
