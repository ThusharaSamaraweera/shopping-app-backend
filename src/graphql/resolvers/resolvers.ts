import {IResolvers} from 'graphql-tools';
import {ProductsController} from "../../controllers/products.controller";


const productController = new ProductsController();

const resolvers: IResolvers = {
  Query: {
    getAllProducts: async () => {
      return await productController.getAllProducts();
    }
  },

  Mutation: {

  },
};

export default resolvers;