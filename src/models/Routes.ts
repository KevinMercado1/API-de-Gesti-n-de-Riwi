import { Schema, model, Document, Types } from 'mongoose';

interface IRoutes extends Document {
  name: string;
  description: string;
  shift: 'morning' | 'night';
  tlId: Types.ObjectId;
}

const RoutesSchema = new Schema<IRoutes>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    shift: { type: String, enum: ['morning', 'night'], required: true },
    tlId: {
      type: Schema.Types.ObjectId,
      ref: 'TL',
      required: true,
    },
  },
  { timestamps: true }
);

const RoutesModel = model<IRoutes>('Routes', RoutesSchema);

export default RoutesModel;
