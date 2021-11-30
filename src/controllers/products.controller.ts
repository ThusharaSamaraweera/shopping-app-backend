import {
  getAllProductService,
} from '../services/product.service';

export class ProductsController {
  async getAllProducts() {
    return await getAllProductService();
  }
}