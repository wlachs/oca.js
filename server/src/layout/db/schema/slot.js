import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { model, Schema } = mongoose;
const slotSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  allowedContentTypes: [{
    type: Schema.Types.ObjectId, ref: 'ContentType', required: true, autopopulate: true,
  }],
});

slotSchema.plugin(mongooseAutoPopulate);
export default model('Slot', slotSchema);
