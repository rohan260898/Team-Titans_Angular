import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  sendEmail(formData: any): Observable<any> {
    const url = `${this.baseUrl}/contact`;
    return this.http.post(url, formData);
  }
}
