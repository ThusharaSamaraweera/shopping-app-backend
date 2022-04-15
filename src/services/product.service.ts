import { INewProduct } from '../types/productTypes';

const Products = require('../models/products');

export default class productService {
  static async addProduct(newProduct: INewProduct){
    try {
      return await Products.create(newProduct);
    } catch (err) {
      console.log(err)
      throw new Error('Failed to create product');
    }
  };
  
  static async getAllProducts () {
    try {
      return await Products.find();
    } catch (err) {
      throw new Error('Products not found');
    }
  };
}