import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'GeopointInput',
  fields: {
    _id: {
      type: GraphQLID
    },
    imageId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    comment: {type: GraphQLString},
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    long: { type: new GraphQLNonNull(GraphQLFloat) },
    alt: { type: GraphQLFloat, defaultValue: 0 }
    }
});
