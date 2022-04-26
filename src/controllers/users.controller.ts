import UserService from '../services/user.service';
import { ILogedUser, INewUser, IUser } from '../types/userTypes';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';

export class UsersController {
  static async addUser(newUser: INewUser) {
    if (!(await UserService.getUserByEmail(newUser.email))) {
      const password: string = CryptoJS.SHA256(newUser.password).toString(CryptoJS.enc.Hex);
      return await UserService.addUser({ ...newUser, password });
    } else {
      throw new UserInputError('Email already exists');
    }
  }

  static async login(email: string, password: string) {
    const tempUser: IUser | null = await UserService.getUserByEmail(email);

    if (!tempUser) {
      throw new UserInputError('Invalid credentials');
    } else {
      const hashPassword: string = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      if (tempUser.password === hashPassword) {
        const token = jwt.sign({ email }, process.env.auth_encryption_salt!, {expiresIn: 60*60})

        const responseUser: ILogedUser = {
          name: tempUser.name,
          address: tempUser.address,
          city: tempUser.city,
          country: tempUser.country,
          email: tempUser.email,
          phoneNumber: tempUser.phoneNumber,
          postalCode: tempUser.postalCode,
          type: tempUser.type,
          token
        }
        return responseUser;
        
      } else {
        throw new UserInputError('Invalid password');
      }
    }
  }

  static getTokenByEmail(email: string) {
    return jwt.sign({ email }, process.env.auth_encryption_salt!, {expiresIn: 60*60});
  }
}
