import { UserInputError } from "apollo-server-express";
import { IInputCategory } from "../types/categoryTypes";
import { INewOrder } from "../types/orderTypes";
import { IUser}  from '../types/userTypes'

const User = require('../models/User');
const Order = require('../models/order')
const Category = require('../models/Category')

export default class orderService {
  static async placeOrder(newOrder: INewOrder){
    const userObject: IUser = await User.findById(newOrder.requestedUser)
    if(!userObject){
      return new UserInputError("User id is incorrent")
    }

    try {
      if(newOrder.changeShippingAddress){
        return await Order.create({
          ...newOrder,
          requestedUser: userObject.id        
        })
      }else {
        return await Order.create({
          ...newOrder,
          requestedUser: userObject.id,
          shippingDetails: {
            name: userObject.name,
            address: userObject.address,
            city: userObject.city,
            postalCode: userObject.postalCode,
            country: userObject.country,
            contactNumber: userObject.phoneNumber
          }
        })
      }
      
    } catch (error) {
      return new Error("Failed to create order" + error)
    }
  }
}