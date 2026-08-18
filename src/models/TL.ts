import { Schema, model } from 'mongoose';

interface ITL {
  name: string;
  position: string;
  shift: { type: String; enum: ['morning', 'night']; required: true };
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
