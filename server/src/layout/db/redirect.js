import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const redirectSchema = new Schema({
  referer: {
    type: Schema.Types.ObjectId, ref: 'Route', required: true, unique: true,
  },
  redirect: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
});

export default model('Redirect', redirectSchema);
