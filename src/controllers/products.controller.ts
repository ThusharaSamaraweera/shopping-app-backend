import { productService } from '../services/product.service';
import { INewProduct } from '../types/productTypes';
export class ProductsController {
  static async getAllProducts() {
    return await productService.getAllProducts();
  }

  static async addProduct(newProduct: INewProduct) {
    return await productService.addProduct(newProduct);
  }
}
