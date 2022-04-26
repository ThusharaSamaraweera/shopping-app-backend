export interface INewUser {
  email: string,
  name: string,
  address: string,
  city: string,
  postalCode: string,
  country: string,
  phoneNumber: string,
  password: string,
  userType: 'user' | 'admin'
}

export interface IUser {
  id:string
  email: string
  name: string
  address: string
  postalCode: string
  country: string
  phoneNumber: string
  city: string
  password: string
  createdAt: string
  updatedAt: string
  type: 'user' | 'admin'
}

export interface ILogedUser {
  email: string
  name: string
  address: string
  postalCode: string
  country: string
  phoneNumber: string
  city: string
  type: 'user' | 'admin'
  token: string;
}