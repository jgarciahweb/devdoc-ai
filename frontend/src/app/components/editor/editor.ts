import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  imports: [FormsModule],
  templateUrl: './editor.html',
})
export class Editor {
  @Output() onSubmit = new EventEmitter<{ code: string; language: string }>();

  code = signal('');
  language = signal('typescript');

  languages = [
    { value: 'typescript', label: 'TypeScript / JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' }
  ];

  sendCode() {
    if (this.code().trim()) {
      this.onSubmit.emit({ code: this.code(), language: this.language() });
    }
  }
}
