import UserService from '../services/user.service';
import { INewUser, IUser } from '../types/userTypes';
import CryptoJS from 'crypto-js';

export class UsersController {
  static async addUser(newUser: INewUser) {
    if (!(await UserService.getUserByEmail(newUser.email))) {
      const password: string = CryptoJS.SHA256(newUser.password).toString(CryptoJS.enc.Hex);
      return await UserService.addUser({ ...newUser, password });
    } else {
      throw new Error('Email already exists');
    }
  }

  static async login(email: string, password: string) {
    const tempUser: IUser | null = await UserService.getUserByEmail(email);

    if (!tempUser) {
      throw new Error('Invalid credentials');
    } else {
      const hashPassword: string = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      if (tempUser.password === hashPassword) {
        return tempUser;
      } else {
        throw new Error('Invalid password');
      }
    }
  }
}
