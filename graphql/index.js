import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import mutations from './mutations';
import queries from './queries';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Query images and GeoPoint records',
    fields: queries
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'Add new image and GeoPoint records',
    fields: mutations
  })
});
