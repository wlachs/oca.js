import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const contentTypeSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  parent: {
    type: Schema.Types.ObjectId, ref: 'ContentType', autopopulate: true,
  },
});

export default model('ContentType', contentTypeSchema);
