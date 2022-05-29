import { IProduct } from "../types/productTypes"
import { IUser } from "../types/userTypes"

export interface INewOrder {
  orderCode:string
  changeShippingAddress:boolean
  requestedUser: string
  shippingDetails: IShippingDetails
  productList: [IProduct]
  status: IState
  paymentType: 'cashOnDelivery'|'onlinePayment'
  paymentStatus: boolean
  deliveryInstructions:string
  requestedDate:string
}

export interface IShippingDetails {
  fullName: string
  address: string
  city: string,
  postalCode: string,
  country: string,
  contactNumber: string,
}

export type IState = 'requested'|'approved'|'rejected';

export interface IOrder {
  id: string
  orderCode:string
  changeShippingAddress:boolean
  requestedUser: IUser
  shippingDetails: IShippingDetails
  productList: [IProduct]
  status: 'requested'|'approved'|'rejected'
  paymentType: 'cashOnDelivery'|'onlinePayment'
  paymentStatus: boolean
  deliveryInstructions:string
  requestedDate:string
}