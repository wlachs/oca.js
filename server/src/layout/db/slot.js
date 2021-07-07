import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const slotSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  allowedContentTypes: [{ type: Schema.Types.ObjectId, ref: 'ContentType', required: true }],
});

export default model('Slot', slotSchema);
