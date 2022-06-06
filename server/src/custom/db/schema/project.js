import mongoose from 'mongoose';

const { model, Schema } = mongoose;
export const projectSchema = new Schema({
  key: { type: Schema.Types.String, required: true, unique: true },
  name: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  imageUrl: { type: Schema.Types.String, required: true },
  link: { type: Schema.Types.String, required: true },
});

export const PROJECT_MODEL_KEY = 'PROJECT_MODEL';
export default model('Project', projectSchema);
