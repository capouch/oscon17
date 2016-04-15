import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Geopoint',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    imageId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    comment: {type: GraphQLString},
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    long: { type: new GraphQLNonNull(GraphQLFloat) },
    alt: { type: GraphQLFloat, defaultValue: 0 },
    }
});
