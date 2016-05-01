import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import imageRecType from '../../types/image';
import getProjection from '../../get-projection';
import ImageRecModel from '../../../models/image-rec';

/* Primitive keyword search on taglist only
  It lets you input a regex, which is very useful
  I didn't design it that way!!
*/

export default {
  type: new GraphQLList(imageRecType),
  description: "Retrieves records whose taglist matches a set of keywords",
  args: {
    keywords: {
      name: 'keywords',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    // Hopefully we can create a regex here!!
    // let r = new RegExp(keywords, "i");
    return ImageRecModel
      .find({ taglist: new RegExp(params.keywords, "i") })
      .select(projection)
      .exec();

  }
};
