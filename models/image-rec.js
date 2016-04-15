import mongoose from 'mongoose';

var imageRecSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  filename: {
    type: String
  },
  taglist: {
    type: String
  }
});

export default mongoose.model('ImageRec', imageRecSchema);
