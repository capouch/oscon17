import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import GeoPointInputType from '../../types/geopoint-input';
import GeoPointRecModel from '../../../models/geopoint';

export default {
  type: GraphQLBoolean,
  description: "Add a new GeoPoint document",
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(GeoPointInputType)
    }
  },
  async resolve (root, params, options) {
    const geoPointRecModel = new GeoPointRecModel(params.data);
    const newGeoPointRec = await geoPointRecModel.save();

    if (!newGeoPointRec) {
      throw new Error('Error adding new geopoint addition');
    }
    return true;
  }
};
