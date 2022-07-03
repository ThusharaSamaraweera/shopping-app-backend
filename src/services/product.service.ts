import { INewProduct } from '../types/productTypes';
import CategoryService from './category.service';

const Products = require('../models/products');

export default class productService {
  static async addProduct(newProduct: INewProduct){
    try {
      const categoryId = await CategoryService.findCategory(newProduct.category.title)
      newProduct.category.id = categoryId._id
      return await Products.create(newProduct);

    } catch (err) {
      console.error(err)
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