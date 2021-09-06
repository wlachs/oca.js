import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const userSchema = new Schema({
  userID: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  passwordHash: { type: Schema.Types.String, required: true },
  groups: [{ type: Schema.Types.ObjectId, ref: 'UserGroup', required: true }],
});

export default model('User', userSchema);
