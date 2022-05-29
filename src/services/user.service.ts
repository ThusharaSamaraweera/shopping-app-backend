import { INewUser } from '../types/userTypes';
const User = require('../models/User');

export default class UserService {
  static async addUser(newUser: INewUser) {
    try {
      return await User.create(newUser);
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }

  static async getUserByEmail(email: string) {
    try {
      return await User.findOne({ email: email });
    } catch (err) {
      throw new Error('Can not find a user');
    }
  }
}
