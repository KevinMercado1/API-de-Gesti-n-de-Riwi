import { Schema, model } from 'mongoose';

interface ITL {
  name: string;
  description: string;
  cargo: string;
}

const TLSchema = new Schema<ITL>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  Position: { type: String, required: true },
});

const TLModel = model<ITL>('TL', TLSchema);

export default TLModel;
