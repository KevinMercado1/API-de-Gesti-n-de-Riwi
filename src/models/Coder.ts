import { Schema, model, Document } from 'mongoose';

interface ICoder extends Document {
  name: string;
  email: string;
  status: 'Active' | 'Retired';
  shift: 'morning' | 'night';
  clanId: Schema.Types.ObjectId;
}

const CoderSchema = new Schema<ICoder>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Retired'],
      default: 'Active',
    },
    shift: {
      type: String,
      enum: ['morning', 'night'],
      required: true,
    },
    clanId: {
      type: Schema.Types.ObjectId,
      ref: 'Clan',
      required: true,
    },
  },
  { timestamps: true },
);

const CoderModel = model<ICoder>('Coder', CoderSchema);

export default CoderModel;
