import { UserInputError } from 'apollo-server-express';
import { INewOrder, IOrder, IState } from '../types/orderTypes';
import { INewProduct, IProduct } from '../types/productTypes';
import { IUser } from '../types/userTypes';
import productService from './product.service';

const User = require('../models/User');
const Order = require('../models/order');

export default class orderService {
  static async placeOrder(newOrder: INewOrder) {
    const userObject: IUser = await User.findById(newOrder.requestedUser);
    if (!userObject) {
      return new UserInputError('User id is incorrent');
    }

    try {
      if (newOrder.changeShippingAddress) {
        return await Order.create({
          ...newOrder,
          requestedUser: userObject.id,
        });
      } else {
        return await Order.create({
          ...newOrder,
          requestedUser: userObject.id,
          shippingDetails: {
            fullName: userObject.name,
            address: userObject.address,
            city: userObject.city,
            postalCode: userObject.postalCode,
            country: userObject.country,
            contactNumber: userObject.phoneNumber,
          },
        });
      }
    } catch (error) {
      return new Error('Failed to create order' + error);
    }
  }

  static async getAllOrders() {
    try {
      return await Order.find({}).populate('requestedUser', '-password');
    } catch (error) {
      throw new Error('Failed to get Orders');
    }
  }

  static async getOneOrder(id: string) {
    try {
      return await Order.findOne({ _id: id }).populate('requestedUser');
    } catch (error) {
      throw new Error('Order not found');
    }
  }

  static async changeOrderStatus(id: string, newStatus: IState) {
    const order: IOrder = await this.getOneOrder(id);

    if (newStatus === 'approved') {
      let isProductExist: boolean = true;
      let errorMassage: string[] = [];

      let productInOrder = null;
      let DbProduct: IProduct | null = null;

      // check whether all product exist and have enough quantity in stock
      for (productInOrder of order.productList) {
        DbProduct = await productService.getOneProduct(productInOrder.id);
        console.log(DbProduct)
        // check whether product exist or not
        if (!DbProduct) {
          errorMassage.push(`Product ${productInOrder.title} does not exists`);
          isProductExist = false;
        }

        // check whether product have enough quantity in stock
        else if (DbProduct.quantity - productInOrder.quantity < 0) {
          errorMassage.push(`Product ${productInOrder.title} quantity is not enough`);
          isProductExist = false;
        }
      }

      // if there is no product or don't have enough quantity in stock
      if (!isProductExist) {
        return {
          errorMassage: errorMassage,
          order: order,
        };
      }

      // reduce quantities from the stock
      for (productInOrder of order.productList) {
        DbProduct = await productService.getOneProduct(productInOrder.id);
        const updateProduct: INewProduct = {
          category: DbProduct?.category!,
          discount_price: DbProduct?.discount_price!,
          quantity: DbProduct?.quantity! - productInOrder.quantity,
          image: DbProduct?.image!,
          regular_price: DbProduct?.regular_price!,
          title: DbProduct?.title!,
        };
        await productService.updateProduct(productInOrder.id, updateProduct);
      }

      // change status of order
      await Order.findOneAndUpdate({ _id: id }, { status: newStatus }, { new: true });

      return {
        errorMassage: [],
        order: order,
      };
    }
  }
}
