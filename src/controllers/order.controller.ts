import orderService from '../services/order.service';
import { INewOrder } from '../types/orderTypes';

export class OrderController {
  static async placeOrder(newOrder: INewOrder) {
    return await orderService.placeOrder(newOrder);
  }

  static async getAllOrders() {
    return await orderService.getAllOrders();
  }
}
