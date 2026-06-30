import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { Preview } from './preview';
import { provideMarkdown } from 'ngx-markdown';

// Configuramos los metadatos globales del componente en Storybook
const meta: Meta<Preview> = {
  title: 'Components/Preview',
  component: Preview,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideMarkdown()],
    }),
  ],
  argTypes: {
    onCopy: { action: 'copiedToClipboard' },
  },
};

export default meta;
type Story = StoryObj<Preview>;

// 1. Historia: Estado inicial vacío
export const EmptyState: Story = {
  args: {
    markdownData: '',
    isLoading: false,
  },
};

// 2. Historia: Estado de carga (Gemini pensando)
export const LoadingState: Story = {
  args: {
    markdownData: '',
    isLoading: true,
  },
};

// 3. Historia: Con Markdown listo para mostrar
export const WithMarkdown: Story = {
  args: {
    isLoading: false,
    markdownData: `
# 📦 Componente Autenticación

Este es un ejemplo de cómo se renderiza el código **Markdown** generado por Gemini de forma automática en nuestra app.

## 🛠️ Métodos Clave

| Método | Tipo | Descripción |
| :--- | :--- | :--- |
| \`login()\` | Public | Inicia la sesión segura del usuario |
| \`logout()\` | Public | Destruye los tokens activos |

### 🚀 Ejemplo de Uso

\`\`\`typescript
const auth = new AuthService();
auth.login('user@dev.com', 'password123');
\`\`\`
    `,
  },
};
