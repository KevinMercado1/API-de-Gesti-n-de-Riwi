import { Schema, model, Document } from 'mongoose';

interface IClan extends Document {
  name: string;
  shift: 'morning' | 'night';
  routeId: Schema.Types.ObjectId;
}

const ClanSchema = new Schema<IClan>(
  {
    name: { type: String, required: true },
    shift: { type: String, enum: ['morning', 'night'], required: true },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
      required: true,
    },
  },
  { timestamps: true },
);

const ClanModel = model<IClan>('Clan', ClanSchema);

export default ClanModel;
