import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { model, Schema } = mongoose;
const viewSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  template: {
    type: Schema.Types.ObjectId, ref: 'Template', required: true, autopopulate: true,
  },
  content: [
    {
      slot: {
        type: Schema.Types.ObjectId, ref: 'Slot', required: true, autopopulate: true,
      },
      content: {
        type: Schema.Types.ObjectId, ref: 'Content', required: true, autopopulate: true,
      },
    },
  ],
  pageTitle: { type: Schema.Types.String, required: true },
});

viewSchema.plugin(mongooseAutoPopulate);
export default model('View', viewSchema);
