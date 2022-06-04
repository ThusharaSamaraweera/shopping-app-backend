import { Context } from 'apollo-server-core';
import CategoryController from '../../controllers/category.controller';
import { OrderController } from '../../controllers/order.controller';
import { ProductsController } from '../../controllers/products.controller';
import { UsersController } from '../../controllers/users.controller';

const mutations = {
  async addProduct(_: any, { newProduct }: any, ctx: Context) {
    return await ProductsController.addProduct(ctx, newProduct);
  },
  async addCategory(_: any, { newCategory }: any) {
    return await CategoryController.addCategory(newCategory);
  },
  async addUser(_: any, { newUser }: any) {
    return await UsersController.addUser(newUser);
  },
  async login(_: any, { email, password }: any) {
    return await UsersController.login(email, password);
  },
  getTokenByEmail(_: any, { email }: any) {
    return UsersController.getTokenByEmail(email);
  },
  async placeOrder(_: any, { newOrder }: any) {
    return await OrderController.placeOrder(newOrder);
  },
  async changeOrderStatus(_: any, {id, newStatus}: any){
    return await OrderController.changeOrderStatus(id, newStatus)
  }
};

export default mutations;
