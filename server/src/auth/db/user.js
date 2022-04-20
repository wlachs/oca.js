import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { model, Schema } = mongoose;
const userSchema = new Schema({
  userID: {
    type: Schema.Types.String, required: true, unique: true, index: true,
  },
  passwordHash: { type: Schema.Types.String, required: true },
  groups: [{
    type: Schema.Types.ObjectId, ref: 'UserGroup', required: true, autopopulate: true,
  }],
});

userSchema.plugin(mongooseAutoPopulate);
export default model('User', userSchema);
