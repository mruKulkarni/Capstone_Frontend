import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8082/register';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, userData).pipe(
      catchError(error => {
        return throwError(() => error.error || 'Registration failed.');
      })
    );
  }
}
