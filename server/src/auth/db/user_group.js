import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const userGroupSchema = new Schema({
  key: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  parent: { type: Schema.Types.ObjectId, ref: 'UserGroup' },
});

export default model('UserGroup', userGroupSchema);
