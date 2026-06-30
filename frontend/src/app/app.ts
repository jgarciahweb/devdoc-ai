import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ai, DocumentHistory } from './services/ai';
import { Preview } from './components/preview/preview';
import { Editor } from './components/editor/editor';
import { HistorySidebar } from './components/history-sidebar/history-sidebar';

@Component({
  selector: 'app-root',
  imports: [Editor, Preview, HistorySidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  private aiService = inject(Ai);

  generatedMarkdown = signal<string>('');
  loading = signal<boolean>(false);

  // 🔴 NUEVO SIGNAL: Almacena el array del historial
  historyList = signal<DocumentHistory[]>([]);

  // Enfoque moderno de Angular 22 para cargar datos iniciales
  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.aiService.getHistory().subscribe({
      next: (response) => {
        if (response.success && response.history) {
          this.historyList.set(response.history);
        }
      }
    });
  }

  processCode(event: { code: string; language: string }) {
    this.loading.set(true);
    this.generatedMarkdown.set('');

    this.aiService.generateDocumentation(event.code, event.language).subscribe({
      next: (response) => {
        if (response.success && response.markdown) {
          this.generatedMarkdown.set(response.markdown);
          this.loadHistory(); // 🔴 Recargamos el historial tras guardar uno nuevo
        } else {
          this.generatedMarkdown.set(`❌ Error: ${response.error || 'No se pudo generar.'}`);
        }
        this.loading.set(false);
      },
      error: () => {
        this.generatedMarkdown.set('❌ Error crítico de red.');
        this.loading.set(false);
      }
    });
  }

  // 🔴 NUEVA FUNCIÓN: Al hacer clic en el historial, recuperamos los datos guardados al instante
  loadDocumentFromHistory(doc: DocumentHistory) {
    this.generatedMarkdown.set(doc.markdownGenerado);
    // Nota opcional: Podrías pasarle también el doc.codeOriginal de vuelta a tu editor si quisieras mediante otra señal
  }

  handleCopyNotification() {
    console.log('¡Copiado!');
  }
}
