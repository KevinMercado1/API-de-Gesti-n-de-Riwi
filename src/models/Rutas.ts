import { Schema, model } from 'mongoose';

interface IRutas {
  name: string;
  descripcion: string;
}

const RutasSchema = new Schema<IRutas>(
  {
    name: { type: String, required: true },
    descripcion: { type: String, required: true },
  },
  { timestamps: true },
);

const RutasModel = model<IRutas>('Rutas', RutasSchema);

export default RutasModel;
