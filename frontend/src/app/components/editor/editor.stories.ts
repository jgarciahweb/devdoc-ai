import type { Meta, StoryObj } from '@storybook/angular';
import { Editor } from './editor';

const meta: Meta<Editor> = {
  title: 'Components/Editor',
  component: Editor,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
};

export default meta;
type Story = StoryObj<Editor>;

// Estado por defecto del editor
export class Default extends Editor {}

// Puedes simular estados adicionales si quisieras rellenar el código por defecto
export const PreFilled: Story = {
  render: (args) => ({
    props: args,
    template: `<app-editor></app-editor>`,
  }),
};
