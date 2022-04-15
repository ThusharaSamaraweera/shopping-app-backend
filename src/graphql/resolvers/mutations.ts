import { CategoryController } from '../../controllers/category.controller';
import { ProductsController } from '../../controllers/products.controller';
import { INewProduct } from '../../types/productTypes';

const mutations = {
  async addProduct(_: any, { newProduct }: any) {
    return await ProductsController.addProduct(newProduct);
  },
  async addCategory(_: any, { newCategory }: any) {
    return await CategoryController.addCategory(newCategory);
  },
};

export default mutations;
