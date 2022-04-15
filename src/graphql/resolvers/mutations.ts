import CategoryController from '../../controllers/category.controller';
import { ProductsController } from '../../controllers/products.controller';
import { UsersController } from '../../controllers/users.controller';

const mutations = {
  async addProduct(_: any, { newProduct }: any) {
    return await ProductsController.addProduct(newProduct);
  },
  async addCategory(_: any, { newCategory }: any) {
    return await CategoryController.addCategory(newCategory);
  },
  async addUser(_: any, {newUser} : any){
    return await UsersController.addUser(newUser)
  }
};

export default mutations;