import UserService from "../services/user.service";
import { INewUser } from "../types/userTypes";
import CryptoJS from 'crypto-js';

export class UsersController {

  static async addUser(newUser: INewUser){
    if(!await UserService.getUserByEmail(newUser.email)){
      const password: string = CryptoJS.SHA256(newUser.password).toString(CryptoJS.enc.Hex)
      return await UserService.addUser({...newUser, password})
    }else{
      throw new Error("Email already exists")
    }
  }
}