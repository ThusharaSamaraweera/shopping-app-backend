import UserService from '../services/user.service';
import { ILogedUser, INewUser, IUser } from '../types/userTypes';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';

export class UsersController {
  
  static async addUser(newUser: INewUser) {
    if (!(await UserService.getUserByEmail(newUser.email))) {
      const password: string = CryptoJS.SHA256(newUser.password).toString(CryptoJS.enc.Hex);
      const user: ILogedUser = await UserService.addUser({ ...newUser, password });

      const token: string = this.getTokenByEmail(newUser.email);

      // const loggedUser: ILogedUser = {
      //   name: newUser.name,
      //   address: newUser.address,
      //   city: newUser.city,
      //   country: newUser.country,
      //   email: newUser.email,
      //   phoneNumber: newUser.phoneNumber,
      //   postalCode: newUser.postalCode,
      //   userType: newUser.userType,
      //   token
      // }
      user.token = token
      return user;

    } else {
      throw new UserInputError('Email already exists');
    }
  }

  static async login(email: string, password: string) {
    const tempUser = await UserService.getUserByEmail(email);

    if (!tempUser) {
      throw new UserInputError('Invalid credentials');
    } else {
      const hashPassword: string = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      if (tempUser.password === hashPassword) {
        const token = this.getTokenByEmail(tempUser.email)

        // const responseUser: ILogedUser = {
        //   name: tempUser.name,
        //   address: tempUser.address,
        //   city: tempUser.city,
        //   country: tempUser.country,
        //   email: tempUser.email,
        //   phoneNumber: tempUser.phoneNumber,
        //   postalCode: tempUser.postalCode,
        //   userType: tempUser.userType,
        //   token
        // }
        tempUser.token = token;
        return tempUser;
        
      } else {
        throw new UserInputError('Invalid password');
      }
    }
  }

  static getTokenByEmail(email: string) {
    return jwt.sign({ email }, process.env.auth_encryption_salt!, {expiresIn: 60*60});
  }
}
