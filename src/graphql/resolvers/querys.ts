import { Context } from 'apollo-server-core';
import CategoryController from '../../controllers/category.controller';
import { OrderController } from '../../controllers/order.controller';
import { ProductsController } from '../../controllers/products.controller';

const query = {
  getAllProducts: async () => {
    return await ProductsController.getAllProducts();
  },
  getAllCategories: async () => {
    return await CategoryController.getAllCategories();
  },
  getAllOrders: async () => {
    return await OrderController.getAllOrders()
  }
};

export default query;
