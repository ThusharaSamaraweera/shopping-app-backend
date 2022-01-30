export interface IProductCategory {
  id: string
  title: string
}

export interface INewProduct {
  title: string
  category: IProductCategory
  quantity: number
  regular_price: number
  discount_price: number
  image: string
}

export interface IProduct {
  id: string
  title: string
  category: IProductCategory
  quantity: number
  regular_price: number
  discount_price: number
  image: string
}