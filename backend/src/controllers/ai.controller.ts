import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import DocumentModel from '../models/Document';

export const generateDocs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, language } = req.body;

    if (!code) {
       res.status(400).json({ error: 'El código es requerido.' });
       return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Validación extra para asegurarte en consola de que la clave se lee bien
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ ERROR: La variable GEMINI_API_KEY está vacía en el entorno.');
      res.status(500).json({ success: false, error: 'Falta la API Key en el servidor.' });
      return;
    }

    const prompt = `
      Actúa como un Ingeniero de Software Senior y un documentador experto. 
      Analiza el siguiente código escrito en el lenguaje/entorno: "${language || 'Autodetectar'}".
      
      Genera una documentación impecable en formato Markdown (README.md) que incluya:
      1. 📝 **Descripción General**: Qué hace el código y cuál es su propósito.
      2. 🛠️ **Arquitectura / Estructura**: Explicación de las funciones, clases o componentes clave.
      3. 📥 **Parámetros e Inputs**: Tabla con los argumentos que recibe, su tipo y descripción (si aplica).
      4. 📤 **Retorno / Outputs**: Qué devuelve o qué efectos secundarios produce.
      5. 🚀 **Ejemplo de Uso**: Un fragmento de código limpio que demuestre cómo integrarlo o usarlo.

      Devuelve ÚNICAMENTE el código Markdown puro. No agregues saludos, introducciones ni explicaciones fuera del bloque Markdown.
      
      Código a analizar:
      ${code}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const markdownText = response.text || '';

    const snippetTitle = code.trim().split('\n')[0].substring(0, 30) || 'Código sin título';
    
    const nuevoDocumento = new DocumentModel({
      title: snippetTitle.replace(/[{}/;()]/g, ''),
      language: language || 'Autodetectar',
      codeOriginal: code,
      markdownGenerado: markdownText
    });

    await nuevoDocumento.save();

    res.status(200).json({
      success: true,
      id: nuevoDocumento._id,
      markdown: markdownText,
    });

  } catch (error: any) {
    console.error('Error en Gemini AI:', error);
    res.status(500).json({
      success: false,
      error: 'Hubo un error al procesar el código con la Inteligencia Artificial.',
    });
  }
};

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const history = await DocumentModel.find().sort({ createdAt: -1 }).limit(10);
    
    res.status(200).json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Error al obtener el historial:', error);
    res.status(500).json({
      success: false,
      error: 'No se pudo recuperar el historial de la base de datos.'
    });
  }
};