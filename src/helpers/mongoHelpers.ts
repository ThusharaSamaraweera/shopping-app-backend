import mongoose = require('mongoose');
import { Config } from '../config';
import jwt from 'jsonwebtoken'

const User = require('../models/User')
export class MongoHelper {
  /**
   * This function returns either true of false based information present in the database
   * @param req
   */
   public async validateUser(req: any) {
    const token = req.headers.authorization || '';
    try {
      const payload = <{ email: string; iat: number }>(
        jwt.verify(token, <string>process.env.auth_encryption_salt)
      );
      const email = payload['email'];
      return await User.find({ email: email })
        .then((response: any) => {
          if (response.length > 0) {
            return { isUserLogged: true, email: email, type:response[0].type };
          }
          return { isUserLogged: false };
        });
    } catch (error) {
      return { isUserLogged: false };
    }
  }

  /**
   * This function will initiate the Mongo Database connection
   */
  public initiateMongoConnection(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose
      .connect(Config.mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('Connected to MongoDb');
      })
      .catch((err: Error) => {
        throw `There is error in connecting Mongo DB ${err.message}`;
      });
  }
}