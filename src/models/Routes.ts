import { Schema, model } from 'mongoose';

interface IRoutes {
  name: string;
  description: string;
}

const RoutesSchema = new Schema<IRoutes>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const RoutesModel = model<IRoutes>('Routes', RoutesSchema);

export default RoutesModel;
