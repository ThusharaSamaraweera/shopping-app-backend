import {IResolvers} from 'graphql-tools';
import query from './querys';
import mutations from './mutations';

const resolvers: IResolvers = {
  Query: query,
  Mutation: mutations
};

export default resolvers;