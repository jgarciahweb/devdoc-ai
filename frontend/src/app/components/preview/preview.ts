import { Component, input, output } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-preview',
  imports: [MarkdownComponent],
  templateUrl: './preview.html'
})
export class Preview {
  markdownData = input<string>('');
  isLoading = input<boolean>(false);

  onCopy = output<void>();

  copyToClipboard() {
    navigator.clipboard.writeText(this.markdownData());
    this.onCopy.emit();
  }

  downloadMarkdownFile() {
    const content = this.markdownData();
    if (!content) return;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
