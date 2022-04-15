import { CategoryService } from '../services/category.service';
import { ICategory } from '../types/categoryTypes';

export class CategoryController {
  static async addCategory(newCategory: ICategory) {
    return await CategoryService.addCategory(newCategory);
  }
}
