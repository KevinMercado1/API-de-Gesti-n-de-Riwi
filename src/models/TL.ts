import { Schema, model } from 'mongoose';

interface ITL {
  name: string;
  description: string;
  position: string;
}

const TLSchema = new Schema<ITL>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TLModel = model<ITL>('TL', TLSchema);

export default TLModel;
