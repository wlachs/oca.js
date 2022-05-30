import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { model, Schema } = mongoose;
const routeSchema = new Schema({
  path: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  view: { type: Schema.Types.ObjectId, ref: 'View', autopopulate: true },
  accessGroups: [{ type: Schema.Types.ObjectId, ref: 'UserGroup', autopopulate: true }],
});

routeSchema.plugin(mongooseAutoPopulate);
export default model('Route', routeSchema);
