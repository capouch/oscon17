import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import imageRecType from '../../types/image';
import getProjection from '../../get-projection';
import ImageRecModel from '../../../models/image-rec';

/* Primitive keyword search
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
    // Project only those properties the query has specified
    const projection = getProjection(options.fieldASTs[0]);
    // We will need to munge the search terms into a regex
    //  That isn't what we're doing here yet, although this illustrates
    //  using the input terms to search multiple properties of the document
    let searchRegex = new RegExp(params.keywords, "i");
    return ImageRecModel
      .find({ $or: [ { taglist: searchRegex } , { title: searchRegex },
        { description: searchRegex }, { source: searchRegex }] } )
      .select(projection)
      .exec();

  }
};
