import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { model, Schema } = mongoose;
const userGroupSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  parent: { type: Schema.Types.ObjectId, ref: 'UserGroup', autopopulate: true },
});

userGroupSchema.plugin(mongooseAutoPopulate);
export default model('UserGroup', userGroupSchema);
