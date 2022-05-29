import { Context } from 'apollo-server-core';
import { VerifyAdminAuthorization, VerifyAuthorization } from '../decorators/auth.deconator';
import productService from '../services/product.service';
import { INewProduct } from '../types/productTypes';
export class ProductsController {

  static async getAllProducts() {
    return await productService.getAllProducts();
  }

  @VerifyAdminAuthorization
  static async addProduct(ctx: Context, newProduct: INewProduct) {
    return await productService.addProduct(newProduct);
  }
}
