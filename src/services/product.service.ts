import { INewProduct } from '../types/productTypes';

const Products = require('../models/products');

export default class productService {
  static async addProduct(newProduct: INewProduct){
    try {
      return await Products.create(newProduct);
    } catch (err) {
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

  static async getOneProduct(id: string) {
    try {
      return await Products.findById({_id: id})
    } catch (error) {
      throw new Error('Product not found')
    }
  }

  static async updateProduct(id: string, newProduct: INewProduct){
    try {
      return await Products.findOneAndUpdate({_id: id}, newProduct, {new: true})
    } catch (error) {
      throw new Error('Failed to update product')
    }
  }
}