import mongoose from 'mongoose';

var geoPointRecSchema = new mongoose.Schema({
  imageId: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  },
  alt: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('GeoPointRec', geoPointRecSchema);
