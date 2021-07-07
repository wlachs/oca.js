import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const templateSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  slots: [{ type: Schema.Types.ObjectId, ref: 'Slot' }],
});

export default model('Template', templateSchema);
