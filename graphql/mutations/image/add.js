import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import imageRecInputType from '../../types/image-input';
import ImageRecModel from '../../../models/image-rec';

export default {
  type: GraphQLBoolean,
  description: "Add a new image document",
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(imageRecInputType)
    }
  },
  async resolve (root, params, options) {
    const imageRecModel = new ImageRecModel(params.data);
    const newImageRec = await imageRecModel.save();

    if (!newImageRec) {
      throw new Error('Error adding new image addition');
    }
    return true;
  }
};
