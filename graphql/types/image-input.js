import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

/* Note:
  In looking at the image and image-input scripts I see I am being
  inconsistent with when the "GraphQLNonNull" prefix is used.  This should
  be fixed before the conference, by finding out where it is needed and then
  taking it out where it is not!
*/

export default new GraphQLInputObjectType({
  name: 'ImageRecInput',
  fields: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    filename: {type: new GraphQLNonNull(GraphQLString)},
    source: {type: GraphQLString},
    taglist: {type: GraphQLString}
  }
});
