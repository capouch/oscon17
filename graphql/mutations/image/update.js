/*
    update.js
    Update an existing ImageRec
    Brian Capouch begun 23 Jun 2016
*/

import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import imageRecUpdateType from '../../types/image-update';
import ImageRecModel from '../../../models/image-rec';

export default {
  type: GraphQLBoolean,
  description: "Edit an existing image document",
  args: {
      data: { type: imageRecUpdateType }
    },
  async resolve (root, params, options) {
    // Put together update object
    console.log(params.data._id)
    const query = {
      _id: params.data._id
    }
    const updateRec = {
      title: params.data.title, description: params.data.description,
          source: params.data.source, taglist: params.data.taglist
        }
    console.log(updateRec)
    const updateResult = ImageRecModel
    .findOneAndUpdate(query, updateRec)


    // "Subquery" for e.g. related geopoint document isn't implemented yet
    return updateResult
  }
}
