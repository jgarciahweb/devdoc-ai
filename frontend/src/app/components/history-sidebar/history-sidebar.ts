import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { DocumentHistory } from '../../services/ai';

@Component({
  selector: 'app-history-sidebar',
  imports: [DatePipe],
  templateUrl: './history-sidebar.html'
})
export class HistorySidebar {
  // Recibe la lista de documentos mediante un Signal Input
  documents = input<DocumentHistory[]>([]);

  // Emite el documento seleccionado al padre
  onSelectDocument = output<DocumentHistory>();

  selectDoc(doc: DocumentHistory) {
    this.onSelectDocument.emit(doc);
  }
}
