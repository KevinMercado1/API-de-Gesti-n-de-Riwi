import { Schema, model } from 'mongoose';

interface ICoder {
  name: string;
  email: string;
  status: 'Activo' | 'Retirado';
}

const CodeSchema = new Schema<ICode>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Activo', 'Retirado'],
    default: 'Activo',
  },
  {timestamps: true}
});

const CoderModel = model<ICoder>('Coder', CoderSchema);

export default CoderModel;
