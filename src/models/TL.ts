import { Schema, model, Document } from 'mongoose';

interface ITL extends Document {
  name: string;
  position: string;
  shift: 'morning' | 'night';
}

const TLSchema = new Schema<ITL>(
  {
    name: { type: String, required: true },
    shift: { type: String, enum: ['morning', 'night'], required: true },
    position: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TLModel = model<ITL>('TL', TLSchema);

export default TLModel;
