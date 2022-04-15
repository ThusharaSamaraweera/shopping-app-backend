import {ProductsController} from "../../controllers/products.controller";

const query = {
  getAllProducts: async () => {
    return await ProductsController.getAllProducts();
  },
}

export default query;