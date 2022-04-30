import CategoryService from '../services/category.service';
import { IInputCategory } from '../types/categoryTypes';

export default class CategoryController {
  static async addCategory(newCategory: IInputCategory) {
    return await CategoryService.addCategory(newCategory);
  }

  static async getAllCategories(){
    return await CategoryService.getAllCategories()
  }
}
