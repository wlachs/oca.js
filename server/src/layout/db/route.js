import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const routeSchema = new Schema({
  path: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  view: { type: Schema.Types.ObjectId, ref: 'View' },
  accessGroups: [{ type: Schema.Types.ObjectId, ref: 'UserGroup' }],
});

export default model('Route', routeSchema);
