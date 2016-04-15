import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'ImageRec',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    filename: {
      type: GraphQLString
    },
    taglist: {
      type: GraphQLString
    },
  }
});
