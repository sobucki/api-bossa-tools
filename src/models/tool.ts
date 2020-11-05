import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Tool {
  _id?: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
  user?: string;
}

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface ToolModel extends Omit<Tool, '_id'>, Document {}
export const Tool: Model<ToolModel> = mongoose.model('Tool', schema);
