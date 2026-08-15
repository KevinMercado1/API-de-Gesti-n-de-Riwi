import { Schema, model } from 'mongoose';

interface ICoder {
  name: string;
  email: string;
  status: 'Active' | 'Retired';
}

const CoderSchema = new Schema<ICoder>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Retired'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

const CoderModel = model<ICoder>('Coder', CoderSchema);

export default CoderModel;
