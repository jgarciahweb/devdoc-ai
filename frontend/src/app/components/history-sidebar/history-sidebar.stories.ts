import type { Meta, StoryObj } from '@storybook/angular';
import { HistorySidebar } from './history-sidebar';
import { DocumentHistory } from '../../services/ai';

const meta: Meta<HistorySidebar> = {
  title: 'Components/HistorySidebar',
  component: HistorySidebar,
  tags: ['autodocs'],
  argTypes: {
    onSelectDocument: { action: 'documentSelected' },
  },
};

export default meta;
type Story = StoryObj<HistorySidebar>;

// 1. Historia: Historial completamente vacío
export const NoHistory: Story = {
  args: {
    documents: [],
  },
};

// Mock de datos falsos para simular MongoDB en Storybook
const mockDocuments: DocumentHistory[] = [
  {
    _id: '1',
    title: 'function calcularDescuento',
    language: 'typescript',
    codeOriginal: '...',
    markdownGenerado: '...',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'class UserService',
    language: 'typescript',
    codeOriginal: '...',
    markdownGenerado: '...',
    createdAt: new Date(Date.now() - 3600000).toISOString() // Hace 1 hora
  },
  {
    _id: '3',
    title: 'def process_data(records):',
    language: 'python',
    codeOriginal: '...',
    markdownGenerado: '...',
    createdAt: new Date(Date.now() - 86400000).toISOString() // Hace 1 día
  }
];

// 2. Historia: Historial poblado con elementos
export const PopulatedHistory: Story = {
  args: {
    documents: mockDocuments,
  },
};
