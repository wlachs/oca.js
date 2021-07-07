import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const viewSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  content: [
    {
      slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
      content: { type: Schema.Types.ObjectId, ref: 'Content', required: true },
    },
  ],
});

export default model('View', viewSchema);
