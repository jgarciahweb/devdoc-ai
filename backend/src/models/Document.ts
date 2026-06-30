import { Schema, model, Document } from 'mongoose';

// 1. Definimos la interfaz para tener tipado estricto en TypeScript
export interface IDocument extends Document {
  title: string;
  language: string;
  codeOriginal: string;
  markdownGenerado: string;
  createdAt: Date;
}

// 2. Creamos el Schema de Mongoose
const DocumentSchema = new Schema<IDocument>({
  title: { 
    type: String, 
    required: true,
    default: 'Documentación Automática' 
  },
  language: { 
    type: String, 
    required: true 
  },
  codeOriginal: { 
    type: String, 
    required: true 
  },
  markdownGenerado: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// 3. Exportamos el modelo
export default model<IDocument>('Document', DocumentSchema);