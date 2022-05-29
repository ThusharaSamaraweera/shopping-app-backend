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
  userType: 'user' | 'admin'
}

export interface ILogedUser {
  id: string
  email: string
  name: string
  address: string
  postalCode: string
  country: string
  phoneNumber: string
  city: string
  userType: 'user' | 'admin'
  token: string;
}