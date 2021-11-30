import mongoose = require('mongoose');
import { Config } from '../config';

export class MongoHelper {

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