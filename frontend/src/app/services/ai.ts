import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface ApiResponse {
  success: boolean;
  markdown?: string;
  error?: string;
}

@Service()
export class Ai {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/ai';

  generateDocumentation(code: string, language: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/generate`, { code, language });
  }
}
