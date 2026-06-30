import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ai } from './services/ai';
import { Preview } from './components/preview/preview';
import { Editor } from './components/editor/editor';

@Component({
  selector: 'app-root',
  imports: [Editor, Preview],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  private aiService = inject(Ai);

  // Estados reactivos mediante Signals
  generatedMarkdown = signal<string>('');
  loading = signal<boolean>(false);

  processCode(event: { code: string; language: string }) {
    this.loading.set(true);
    this.generatedMarkdown.set(''); // Limpiamos pantalla previa

    this.aiService.generateDocumentation(event.code, event.language).subscribe({
      next: (response) => {
        if (response.success && response.markdown) {
          this.generatedMarkdown.set(response.markdown);
        } else {
          this.generatedMarkdown.set(`❌ Error: ${response.error || 'No se pudo generar la documentación.'}`);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.generatedMarkdown.set('❌ Error crítico de red al conectar con el servidor.');
        this.loading.set(false);
      }
    });
  }

  handleCopyNotification() {
    // Aquí podrías disparar un toast de éxito si quisieras
    console.log('¡Copiado al portapapeles con éxito!');
  }
}
