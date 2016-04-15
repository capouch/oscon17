import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'ImageRecInput',
  fields: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    filename: {type: new GraphQLNonNull(GraphQLString)},
    taglist: {type: GraphQLString}
  }
});
