import { ProductsController } from "../../controllers/products.controller"
import { INewProduct } from "../../types/productTypes"

const mutations = {
  async addProduct(_: any, {newProduct}: any) {
    return await ProductsController.addProduct(newProduct)
  },
}

export default mutations;
