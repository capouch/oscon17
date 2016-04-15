import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import geoPointRecType from '../../types/geopoint';
import getProjection from '../../get-projection';
import GeoPointRecModel from '../../../models/geopoint';

export default {
  type: geoPointRecType,
  description: "Retrieves a single GeoPoint document by its ID",
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return GeoPointRecModel
      .findById(params.id)
      .select(projection)
      .exec();
  }
};
