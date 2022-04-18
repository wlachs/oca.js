import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const projectSchema = new Schema({
  key: { type: Schema.Types.String, required: true, unique: true },
  params: {
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    imageUrl: { type: Schema.Types.String, required: true },
    link: { type: Schema.Types.String, required: true },
  },
});

export default model('Project', projectSchema);
