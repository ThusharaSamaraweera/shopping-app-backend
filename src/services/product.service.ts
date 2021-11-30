import { INewProduct } from '../types/productTypes';

const Products = require('../models/products');

export const addProductService = async (newProduct: INewProduct) => {
  try {
    return await Products.create(newProduct);
  } catch (err) {
    throw new Error('Failed to create product');
  }
};

export const getAllProductService = async () => {
  try {
    return await Products.find();
  } catch (err) {
    throw new Error('Products not found');
  }
};