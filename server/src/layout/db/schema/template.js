import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { model, Schema } = mongoose;
const templateSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  slots: [{ type: Schema.Types.ObjectId, ref: 'Slot', autopopulate: true }],
});

templateSchema.plugin(mongooseAutoPopulate);
export default model('Template', templateSchema);
