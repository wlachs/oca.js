import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { model, Schema } = mongoose;
const contentSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  type: {
    type: Schema.Types.ObjectId, ref: 'ContentType', required: true, autopopulate: true,
  },
  attributes: [{
    key: { type: Schema.Types.String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
  }],
  componentMapper: { type: Schema.Types.String },
});

contentSchema.plugin(mongooseAutoPopulate);
export default model('Content', contentSchema);
