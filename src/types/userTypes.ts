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