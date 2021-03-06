import { IInputCategory } from '../types/categoryTypes';

const Category = require('../models/Category');

export default class CategoryService {
  static async addCategory(newCategory: IInputCategory) {
    try {
      return await Category.create(newCategory);
    } catch (error) {
      throw new Error('Failed to create category');
    }
  }

  static async getAllCategories() {
    try {
      return await Category.find();
    } catch (error) {
      throw new Error('Categories not found');
    }
  }
}
