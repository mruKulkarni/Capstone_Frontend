import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8082/user'; // Adjust according to your backend

  constructor(private http: HttpClient) {}

  getProfile(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${email}`);
  }
}
