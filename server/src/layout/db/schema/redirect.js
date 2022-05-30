import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { model, Schema } = mongoose;
const redirectSchema = new Schema({
  referer: {
    type: Schema.Types.ObjectId, ref: 'Route', required: true, unique: true, autopopulate: true,
  },
  redirect: {
    type: Schema.Types.ObjectId, ref: 'Route', required: true, autopopulate: true,
  },
});

redirectSchema.plugin(mongooseAutoPopulate);
export default model('Redirect', redirectSchema);
