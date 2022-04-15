import CategoryService from '../services/category.service';
import { ICategory } from '../types/categoryTypes';

export default class CategoryController {
  static async addCategory(newCategory: ICategory) {
    return await CategoryService.addCategory(newCategory);
  }

  static async getAllCategories(){
    return await CategoryService.getAllCategories()
  }
}
