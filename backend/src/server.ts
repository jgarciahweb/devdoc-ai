import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import aiRoutes from './routes/ai.routes';

// Configurar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite peticiones de otros orígenes (Angular)
app.use(express.json()); // Permite recibir formato JSON en el body

// Rutas de la API
app.use('/api/ai', aiRoutes);

// Ruta base de chequeo
app.get('/', (req, res) => {
  res.send('🚀 DevDoc AI Backend funcionando perfectamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
});