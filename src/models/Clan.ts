import { Schema, model } from 'mongoose';

interface IClan {
  name: string;
}

const ClanSchema = new Schema<IClan>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const ClanModel = model<IClan>('Clan', ClanSchema);

export default ClanModel;
