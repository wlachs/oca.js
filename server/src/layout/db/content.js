import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const contentSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  type: { type: Schema.Types.ObjectId, ref: 'ContentType', required: true },
  attributes: [{
    key: { type: Schema.Types.String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
  }],
});

export default model('Content', contentSchema);
