/*  delete.js
      Remove an image record from the database
*/

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

import imageRecUpdateType from '../../types/image-update';
import ImageRecModel from '../../../models/image-rec';

export default {
  type: GraphQLBoolean,
  description: "Remove an existing image document",
  args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID)
      }
    },
  async resolve (root, params, options) {
    // console.log('Deleting: ' + params.id)
    const updateResult = ImageRecModel
    .findById(params.id)
    .remove()
    .exec()

    // "Subquery" for e.g. related geopoint document isn't implemented yet
    return updateResult
  }
}
