import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import geoPointRecType from '../../types/geopoint';
import getProjection from '../../get-projection';
import GeoPointRecModel from '../../../models/geopoint';

export default {
  type: new GraphQLList(geoPointRecType),
  description: "Retrieves all GeoPoint documents",
  args: {},
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return GeoPointRecModel
      .find()
      .select(projection)
      .exec();
  }
};
