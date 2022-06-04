import orderService from '../services/order.service';
import { INewOrder, IState } from '../types/orderTypes';

export class OrderController {
  static async placeOrder(newOrder: INewOrder) {
    return await orderService.placeOrder(newOrder);
  }

  static async getAllOrders() {
    return await orderService.getAllOrders();
  }

  static async changeOrderStatus(id: string, newStatus: IState){
    return await orderService.changeOrderStatus(id, newStatus)
  }
}
