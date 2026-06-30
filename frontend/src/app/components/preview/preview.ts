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
}
