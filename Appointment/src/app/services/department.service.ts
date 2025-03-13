import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8082/departments'; // Replace with actual API endpoint
  private apiAddUrl = 'http://localhost:8082/addDepartment';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addDepartment(departmentName: string): Observable<any> {
    return this.http.post(this.apiAddUrl, { name: departmentName });
  }
}
